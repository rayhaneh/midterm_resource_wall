
exports.up = function(knex, Promise) {
  return knex.schema.createTable('comments', function (table) {
    table.increments()
    table.string('content')
    table.foreign('user_id').references('users.id')
    table.foreign('url_id').references('URLs.id')
    table.integer('rating')
  })
}
exports.down = function(knex, Promise) {
  return knex.schema.dropTable('comments')
};
