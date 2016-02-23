
exports.up = function(knex, Promise) {
  return knex.schema.createTable('tweetQuery', function(table){
  	table.increments(),
  	table.string('username'),
  	table.string('query')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('tweetQuery')
};
