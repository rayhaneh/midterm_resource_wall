exports.up = function(knex, Promise) {
    return knex.schema.table('urls', function (table) {
      table.text('description')
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.table('urls', function(table){
    table.dropColumn('description')
  })
}
