var express = require('express');
var router = express.Router();
var knex = require('../../db/knex');
var request = require('request');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');



// Gets the tweet data
router.post('/', function(req, res) {
    var screenName;
    var token;
    var userID;

    var prom = new Promise(
        function(resolve, reject) {
            // API call to the titter API
            console.log('here');
            knex('users').where('username', req.body.username).first().then(function(user) {
                if (!user) {
                    return reject(Error('you suck'))
                } else {
                    var pass = req.body.password;
                    bcrypt.genSalt(10, function(err, salt){
                        bcrypt.hash(pass, salt, function(err, hash){
                			bcrypt.compare(hash, user.password, function(err,result){
                                console.log('trying to login', err, result);
                				if (err || !result){
                					console.log('did not login')
                                    reject({
                                        err: err,
                                        passwordsMatched: result
                                    });
                				} else {
                                    console.log('logged in');
                              token = jwt.sign({
                              				username: req.body.username,
                             				}, process.env.JWT_SECRET);
                				}

                            })
        			     })
                    })
                    screenName = user.default_twitterhandle;
                    userID = user.id;
                    var apiURL = 'https://api.twitter.com/1.1/statuses/user_timeline.json';
                    request({
                        url: apiURL,
                        method: 'GET',
                        json: true,
                        qs: {
                            'screen_name': screenName,
                            'count': 200,
                            'exclude_replies': true
                        },
                        headers: {
                            "Authorization": "Bearer " + process.env.TWITTER_BEARER_TOKEN
                        }
                    }, function(err, res, body) {
                        // returns an error if screenName is not a twitter username
                        if (body.errors) return reject(Error(body.errors[0].message));
                        var tweets = [];
                        body.forEach(function(tweet) {
                            var tweet = {
                                text: tweet.text,
                                date: new Date(tweet.created_at),
                                retweets: tweet.retweet_count,
                                favs: tweet.favorite_count
                            };
                            tweets.push(tweet);
                        })
                        // API call to the sentimate API
                        request({
                            url: 'http://www.sentiment140.com/api/bulkClassifyJson',
                            method: 'POST',
                            json: true,
                            qs: {
                                'appid': process.env.SENTIMENT_TOKEN
                            },
                            body: {"data": tweets}
                        }, function(err, res, body) {
                            resolve(body);
                        })
                    })
                }
            });
        }
    ).then(
        // inserts the tweets into the db if they are not already there
        function(val) {
            var data = val.data;
            data.forEach(function(tweet) {
                knex('tweet_data').where({
                    twitter_handle: screenName,
                    tweet_date: tweet.date
                }).first().then(function(tweetInTable) {
                    if (!tweetInTable) {
                        knex('tweet_data').insert({
                            twitter_handle: screenName,
                            tweet_retweets: tweet.retweets,
                            tweet_favorites: tweet.favs,
                            tweet_date: tweet.date,
                            tweet_score: tweet.polarity
                        }).then(function() {
                            console.log('inserted');
                        })
                    }

                })

            })
            console.log('done');
            // CREATE A JWT, AND ADD IT TO DATA
            res.json({jwt:token, id:userID, twitterHandle:screenName});
            // do something here with data to send to frontend
        }
    ).catch(
        function(reason) {
            console.log(reason);
            res.status(500);
            res.send("FAILURE, CHECK SERVER LOGS");
        }
    )

    //res.redirect('/tweets');
})

router.get('/:username', function(req, res) {
    var screenName = req.params.username;
    knex('tweet_data').where('twitter_handle', screenName).then(function(data) {
        console.log(data);
        res.json({data:data});
        // do something here with data to send to frontend
    })
})




module.exports = router;
