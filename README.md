###Project description
This is an app to run a person's tweets through a sentiment analysis interpreter. It can be used to track a person's moods over time or to examine their online presence and emotional projection.

###Who uses it
A user who wants to either analyze themselves or another twitter user.

###Outputs
A rating per tweet and the ability to look at averages over a set time interval.

###Inputs
Tweets.

###Technologies
- Twitter API
- [Sentimate analysis API](http://help.sentiment140.com/api)
- AngularJS
- Bootstrap
- postgreSQL
- NodeJS
- Express

###Feature list
- CRUD for accounts
- Interact with Twitter
- Filter results by time frame
- Search for other uses's tweets
- See interactive logs of your own results

### Sentimate analysis on twitter

* Track moods over time
* data about "who you appear to be" online
* charting moods with d3 or something similar
* what sentiments get most retweeted


#### Front end

* signup -- which enable some features
    * requires JWT, and API auth enabled routes
* charts -- this is big
* dashboard and user management
    * Time frame
    * Select specific portions of sentiment analisys
    * Save specific configurations / views
* Compare specific actors across time

#### Backend

* persist user data
    * configured searches
    * previous sentiment analysis results
* API routes to daisy-chain the twitter requests
* Implement the sentiment analysis stuff


#### places to start

* Setup auth both for users and Twitter.
* Get a database config setup, with knex migrations and seed data
* wireframes
* Getting a d3 chart on the page with fake data
