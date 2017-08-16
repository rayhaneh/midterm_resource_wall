
exports.up = function(knex, Promise) {
   return knex.schema.createTable('URLs', function (table) {
    table.increments()
    table.string('Desc')
    table.string('URL')
    table.integer('cat_id')
    table.string('Title')
    table.integer('user_id')
    table.foreign('user_id').references('users.id')
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('URLs')
}
