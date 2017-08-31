exports.up = function(knex, Promise) {
    return knex.schema.table('urls', function (table) {
      table.dropColumn('description')
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.table('urls', function(table){
    table.dropColumn('description')
  })
}
