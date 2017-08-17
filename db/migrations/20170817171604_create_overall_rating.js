
exports.up = function(knex, Promise) {
    return knex.schema.table('URLs', function (table) {
      table.integer('overallRating')
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.table('URLs', function(table){
    table.dropColumn('overallRating');
  })
}
