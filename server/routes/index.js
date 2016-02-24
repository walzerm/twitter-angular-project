var express = require('express');
var router = express.Router();
var knex = require('../../db/knex');
var locus = require('locus');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { username: 'Sentimeta' });
});

//Signup knex statement
router.post('/new/user', function(req,res,next){
	knex('users').where({username:req.body.username}).first().then(function(user){
		if (user || req.body.password !== req.body.passwordConfirm){
			//#TODO: create error route/template
			res.send('DANGER: USERNAME/PASSWORD ERROR');
		} else { bcrypt.genSalt(10, function(err, salt){

            bcrypt.hash(req.body.password, salt, function(err, hash){

            knex('users').insert({username: req.body.username, password: hash}).returning('id').then(function(id){
              //#TODO: create either a user template or just redirect home
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
router.post('/user/login', function(req,res,next){
	knex('users').where({username: req.body.username}).first().then(function(user){
		if (user){
			var pass = req.body.password;
			bcrypt.compare(pass,user.password,function(err,result){
				if (err){
					console.log(err)
				} else {
              var token = jwt.sign({
              				username: req.body.username,
             				}, process.env.JWT_SECRET);

					res.json({jwt:token, id:user.id});
				}
			})
		}
	})
})




module.exports = router;
