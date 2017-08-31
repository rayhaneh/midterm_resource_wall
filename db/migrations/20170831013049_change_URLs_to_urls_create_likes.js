exports.up = function(knex, Promise) {
  return knex.schema.createTable('likes', function (table) {
    table.integer('user_id')
    table.foreign('user_id').references('users.id')
    table.integer('url_id')
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('likes')
}

