exports.up = function(knex, Promise) {
   return knex.schema.createTable('urls', function (table) {
    table.increments()
    table.string('url')
    table.integer('cat_id')
    table.foreign('cat_id').references('categories.id')
    table.string('title')
    table.integer('user_id')
    table.foreign('user_id').references('users.id')
    table.string('description')
    table.text('image')
    table.integer('overallRating')
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('urls')
}


