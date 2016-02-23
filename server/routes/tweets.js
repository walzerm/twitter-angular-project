var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var request = require('request');

router.get('/tweets', function(req, res) {
    var screenName = req.body
    knex('tweetData').where('username', req.body).first().then(function(username) {
        if (!username) {
            getTweets(screenName);

        }
    })
})

function getTweets(screenName) {
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
        console.log(tweets);
    })
}

module.exports = router;
