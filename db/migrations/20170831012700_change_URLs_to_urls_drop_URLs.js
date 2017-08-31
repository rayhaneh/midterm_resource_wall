exports.up = function(knex, Promise) {
  return knex.schema.dropTable('URLs')
}

exports.down = function(knex, Promise) {
   return knex.schema.createTable('URLs', function (table) {
    table.increments()
    table.string('URL')
    table.integer('cat_id')
    table.foreign('cat_id').references('categories.id')
    table.string('Title')
    table.integer('user_id')
    table.foreign('user_id').references('users.id')
    table.string('Desc')
    table.text('image')
    table.integer('overallRating')
  })
}

