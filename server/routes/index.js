var express = require('express');
var router = express.Router();
var knex = require('../../db/knex');
var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;
var locus = require('locus');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
require('dotenv').config();

router.use(passport.initialize());
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { username: 'Sentimeta' });
});


//Signup knex statement
router.post('/new', function(req,res,next){
	knex('users').where({username:req.body.username}).first().then(function(user){
		if (user || req.body.password !== req.body.passwordConfirm){
			res.send('DANGER: USERNAME/PASSWORD ERROR');
		} else { bcrypt.genSalt(10, function(err, salt){
            bcrypt.hash(req.body.password, salt, function(err, hash){

            knex('users').insert({username: req.body.username, password: hash}).returning('id').then(function(id){
              var token = jwt.sign({
              				username: req.body.username,
             				}, process.env.JWT_SECRET);

              res.json({jwt:token, id:id})
            });
          });
        });
      }
	})
})
//Signin request and setting the JWT
router.post('/login', function(req,res,next){
	knex('users').where({username: req.body.username}).first().then(function(user){
		if (user){
			var pass = req.body.password;
			console.log(user);
			bcrypt.compare(pass,user.password,function(err,result){
				if (err){
					console.log(err)
					res.send('failed login attempt')
				} else {
              var token = jwt.sign({
              				username: req.body.username,
             				}, process.env.JWT_SECRET);

					res.json({jwt:token, id:user.id});
				}
			})
		}
	})
});

router.post('/delete', function(req,res,next){
	if(req.headers.authorization){

        var token = req.headers.authorization.split(' ')[1];
        var decoded = jwt.verify(token,process.env.JWT_SECRET);

    knex('users').where({username: decoded.username}).first().delete().then(function(result){
    	res.send('success')
    })
    }
});


//LOGIN/SIGNUP with Twitter

passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: process.env.HOST + "/auth/twitter/callback"
  },
  function(token, tokenSecret, profile, cb) {

    knex('users').insert({
      username: profile.displayName,
      default_twitterhandle: profile.username,
      registered_by_twitter:true
    }).then(function(){
      res.send('user added via twitter');
    });
    cb();
  }
));

//Twitter auth middleware
router.get('/auth/twitter',
  passport.authenticate('twitter'));

router.get('/auth/twitter/callback', 
  passport.authenticate('twitter', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

module.exports = router;
