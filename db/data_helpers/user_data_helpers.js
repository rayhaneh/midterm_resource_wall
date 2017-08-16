'use strict'

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeUserDataHelpers(knex) {
  return {

    // GET USERS INFO FROM DB. RETURN FULL
    getUser: function(id, callback) {
      knex
        .select("*")
        .from("users")
        .where('id','=',id)
        .then((user) => {
          return callback(null, user)
        })
        .catch((err) => {
          return callback(err)
        })
    },
  // GET USERS INFO FROM DB. RETURN FULL
    getUserURLs: function(id, callback) {
      knex
        .select("*")
        .from("URLs")
        .where('user_id','=', id)
        .then((urls) => {
          return callback(null, urls)
        })
        .catch((err) => {
          return callback(err)
        })
    }
// SAVEUSER user with object {name, avatar, email, pword} INSERT NOT SELECT
    saveUser: function(user) {
      knex("users").insert(user)

    }
  }
}
