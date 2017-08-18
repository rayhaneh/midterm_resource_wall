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


    // ADD A NEW URL
    saveURL: function(url, callback) {
      knex("URLs")
      .returning('id')
      .insert(url)
      .then((id) => {
        return callback(null, id)
      })
      .catch((err) => {
        return callback(err)
      })
    },


    // GET ALL COMMENTS FOR ONE URL
    getComments: function(id , callback) {
      knex
        .select("*")
        .from('comments')
        .where('url_id', '=', id)
        .then((comments) => {
          // foreach
          return callback(null, comments)
        })
        .catch((err) => {
          return callback(err)
        })
    },

    // SEARCH A QUERY
    search: function(text, callback) {
      knex.raw
      ('select * from URLs where URL = ?', [text])
        .then((url) => {
          return callback(null, url)
        })
        .catch((err) => {
          return callback(err)
        })
    }



  }
}
