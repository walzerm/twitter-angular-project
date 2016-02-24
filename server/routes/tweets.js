var express = require('express');
var router = express.Router();
var knex = require('../../db/knex');
var request = require('request');

router.get('/', function(req, res, next) {
  res.render('testTweet');
});

router.post('/', function(req, res) {
    var screenName = req.body.handle;

    var prom = new Promise(
        function(resolve, reject) {
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
                    resolve(body);
                })
            })
        }
    ).then(
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
                            console.log('insterted ' + tweet.text);
                        })
                    }
                })
            })
        }
    )
    
    res.redirect('/tweets');
})




module.exports = router;
