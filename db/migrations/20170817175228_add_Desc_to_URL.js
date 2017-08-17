
exports.up = function(knex, Promise) {
    return knex.schema.table('URLs', function (table) {
      table.text('Desc')
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.table('URLs', function(table){
    table.dropColumn('Desc')
  })
}
