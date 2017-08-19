'use strict'

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeURLDataHelpers(knex) {
  return {

    // GET A SINGLE URL
    getURL: function(URL, callback) {
      knex
        .select("*")
        .from("URLs")
        .where('Title', URL) //${'%' + URL + '%'}`)
        .then((urls) => {

          return callback(null, urls[0])
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
        return id
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
        .innerJoin('users', 'comments.user_id', 'users.id')
        .where('url_id', '=', id)
        .then((comments) => {
          return callback(null, comments)
        })
        .catch((err) => {
          return callback(err)
        })
    },

    // SAVE A NEW USER
    saveComment: function(comment, callback) {
      knex('comments')
      .insert(comment)
      .returning('id')
      .then((id) => {
        return callback(null, id)
      })
      .catch((err) => {
        return callback(err)
      })
    },


    // A new comment is saved in comments -> Update the overall rating in URLs table
    updateOverallRating: function (urlid, callback) {
      console.log('URL ID:',urlid)
      knex('comments')
        .avg('rating as avg')
        .where('url_id', '=', urlid)
        .then((result) => {
          console.log('AVG: ', result[0].avg)
          return knex('URLs')
            .where('id', '=', urlid)
            .update({
              overallRating  : Math.round(result[0].avg)
            });
        })
        .then((result2) => {
          console.log("result2", result2);
          // console.log('Math Floor AVG: ', Math.round(result2[0].avg))
          callback(null);
        })
        .catch((err) => {
          callback(err);
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
