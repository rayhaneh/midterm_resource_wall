exports.up = function(knex, Promise) {
  return knex.schema.createTable('comments', function (table) {
    table.increments()
    table.string('content')
    table.integer('user_id')
    table.foreign('user_id').references('users.id')
    table.integer('url_id')
    table.integer('rating')
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('comments')
}

