
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table){
  		table.increments(),
  		table.string('username').unique(),
        table.string('default_twitterhandle'),
  		table.string('password'),
  		table.boolean('registered_by_twitter')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users')
};
