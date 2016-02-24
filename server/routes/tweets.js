var express = require('express');
var router = express.Router();
var knex = require('../../db/knex');
var request = require('request');

router.get('/', function(req, res, next) {
  res.render('testTweet');
});

router.post('/', function(req, res) {
    var screenName = req.body.handle;
    console.log(req.body);
    knex('tweetData').where('twitter_handle', req.body).first().then(function(twitter_handle) {
        if (!twitter_handle) {
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
                var tweets = [];
                console.log(process.env.TWITTER_BEARER_TOKEN);
                console.log(body);
                console.log('******');
                body.forEach(function(tweet) {
                    var tweet = {
                        text: tweet.text,
                        date: new Date(tweet.created_at),
                        retweets: tweet.retweet_count,
                        favs: tweet.favorite_count
                    };
                    tweets.push(tweet);
                })
                request({
                    url: 'http://www.sentiment140.com/api/bulkClassifyJson',
                    method: 'POST',
                    json: true,
                    qs: {
                        'appid': process.env.SENTIMENT_TOKEN
                    },
                    body: {"data": tweets}
                }, function(err, res, body) {
                    console.log(body);
                })
            })

        }
    })
    res.redirect('/tweets');
})




module.exports = router;
