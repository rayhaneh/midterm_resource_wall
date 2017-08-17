'use strict'

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeURLDataHelpers(knex) {
  return {

    // GET A SINGLE URL
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

    // GET ALL THE URLS
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
    },

    // --- FUNCTIONS THAT WE NEED:
    // GET ALL RATINGS FOR A URL AND RETURNS THE OVERAL RATING
    getOveralRating: function(id, callback) {
      // knex
      // .select('rating')
      // .from('')
    },

    // GET ALL COMMENTS FOR ONE URL
    getComments: function(id , callback) {

    },


    search: function(text, callback) {

    }



  }
}
