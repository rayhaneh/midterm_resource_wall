'use strict'

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeUserDataHelpers(knex) {
  return {

    // GET USERS INFO FROM DB. RETURN FULL
    getUser: function(key, value, callback) {
      console.log(key,value)
      knex
        .select("*")
        .from("users")
        .where(key,'=',value)
        .then((user) => {
          console.log(user)
          return callback(null, user)
        })
        .catch((err) => {
          console.log(err)
          return callback(err)
        })
    },
    // GET USERS INFO FROM DB. RETURN FULL
    getUserURLs: function(id, callback) {
      knex
        .select(
          'URLs.id',
          'URLs.URL',
          'URLs.cat_id',
          'URLs.Title',
          'URLs.overallRating',
          'URLs.user_id',
          'URLs.Desc',
          'URLs.image',
          'categories.name as category-name')
        .from('URLs')
        .innerJoin('categories', 'URLs.cat_id', 'categories.id')
        .where('user_id','=', id)
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
      console.log('*******',user)
      .then((id) => {
        return callback(null, id)
        console.log('*******',id)
      })
      .catch((err) => {
        console.log('*******',err)
        return callback(err)
      })
    },
    // UPDATE USER
    updateUser: function(id, name, email, callback) {
      knex('users')
      .where('id', '=', id)
      .update({
        name  : name,
        email : email
      })
      .then(() => {
        return callback(null)
      })
      .catch((err) => {
        return callback(err)
      })
    },

    getCategories: function(callback) {
      knex
      .select('*')
      .from('categories')
      .then((categories) => {
        return callback(null,categories)
      })
      .catch((err) => {
        return callback(err)
      })

    }

  }
}
