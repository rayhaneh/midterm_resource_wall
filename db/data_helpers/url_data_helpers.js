'use strict'

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeURLDataHelpers(knex) {
  return {

    // SAVE A SINGLE TWEET
    getURL: function(id, callback) {
      knex
        .select("*")
        .from("URLs")
        .where('id','=',id)
        .then((url) => {
          return callback(null, url)
        })
        .catch((err) => {
          return callback(err)
        })
    },
    getURLs: function(callback) {
      knex
        .select("*")
        .from("URLs")
        .then((urls) => {
          // foreach
          return callback(null, urls)
        })
        .catch((err) => {
          return callback(err)
        })
    }

    // getRating
    // getComment
  }
}
