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
          console.log(user)
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
        .where('user_id','=', 1)
        .then((urls) => {
          return callback(null, urls)
        })
        .catch((err) => {
          return callback(err)
        })
    },
    // SAVE A NEW USER
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
