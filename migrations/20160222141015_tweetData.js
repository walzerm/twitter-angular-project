
exports.up = function(knex, Promise) {
 return knex.schema.createTable('tweet_data', function(table){
 	table.increments(),
 	table.string('twitter_handle'),
 	table.integer('tweet_retweets').unsigned(),
 	table.integer('tweet_favorites').unsigned(),
 	table.timestamp('tweet_date'),
 	table.integer('tweet_score')
 })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('tweet_data')
};
