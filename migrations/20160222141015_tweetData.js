
exports.up = function(knex, Promise) {
 return knex.schema.createTable('tweetData', function(table){
 	table.increments(),
 	table.string('username'),
 	table.integer('tweet_retweets'),
 	table.integer('tweet_favorites'),
 	table.timestamp('tweet_date'),
 	table.integer('tweetScore')
 }) 
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('tweetData')
};


