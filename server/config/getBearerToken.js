
var request = require("request");

var key = process.env.TWITTER_CONSUMER_KEY;
var secret = process.env.TWITTER_CONSUMER_SECRET;
var cat = key + ":" + secret;
var credentials = new Buffer(cat).toString('base64');
var url = 'https://api.twitter.com/oauth2/token';

request({
    url: url,
    method: 'POST',
    headers: {
        "Authorization": "Basic " + credentials,
        "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
    },
    body: "grant_type=client_credentials"

}, function(err, res, body) {
    // Save this as the bearer token
    console.log(body);
});
