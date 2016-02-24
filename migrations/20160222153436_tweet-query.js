
exports.up = function(knex, Promise) {
  return knex.schema.createTable('tweetQuery', function(table){
  	table.increments(),
  	table.string('username').references('users.username').onDelete('cascade')
  	table.string('twitter_handle')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('tweetQuery')
};
