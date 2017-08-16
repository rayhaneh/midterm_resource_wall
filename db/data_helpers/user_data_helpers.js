'use strict'

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeUserDataHelpers(knex) {
  return {

    // GET USERS INFO FROM DB. RETURN FULL
    getUser: function(key, value, callback) {
      knex
        .select("*")
        .from("users")
        .where(key,'=',value)
        .then((user) => {
          return callback(null, user)
        })
        .catch((err) => {
          console.log('*******',err)
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
    },
// SAVEUSER user with object {name, avatar, email, pword} INSERT NOT SELECT
    saveUser: function(user, callback) {
      knex("users")
      .returning('id')
      .insert(user)
      .then((id) => {
        return callback(null, id)
      })
      .catch((err) => {
        return callback(err)
      })
    }
  }
}
