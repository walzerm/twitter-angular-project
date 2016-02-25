
exports.up = function(knex, Promise) {
  return knex.schema.createTable('tweet_query', function(table){
  	table.increments(),
  	table.string('username').references('username').inTable('users').onDelete('cascade')
  	table.string('twitter_handle')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('tweet_query');
};
