
exports.up = function(knex, Promise) {
    return knex.schema.table('likes', function (table) {
      table.foreign('url_id').references('urls.id')
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.table('likes', function(table){
    table.dropForeign('url_id')
  })
}
