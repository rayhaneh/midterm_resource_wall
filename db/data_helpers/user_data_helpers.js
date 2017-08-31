'use strict'

// Defines helper functions for saving and getting users,
module.exports = function makeUserDataHelpers(knex) {
  return {

    // GET A SINGLE USER
    getUser: function(key, value, callback) {
      knex
        .select("*")
        .from("users")
        .where(key, '=', value)
        .then((user) => {
          return callback(null, user)
        })
        .catch((err) => {
          return callback(err)
        })
    },

    // GET A SINGLE USERS URLS
    getUserURLs: function(id, callback) {
      knex
        .select(
          'urls.id',
          'urls.url',
          'urls.cat_id',
          'urls.title',
          'urls.overallRating',
          'urls.user_id',
          'urls.description',
          'urls.image',
          'categories.name as category-name')
        .from('urls')
        .innerJoin('categories', 'urls.cat_id', 'categories.id')
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
      .then((id) => {
        return callback(null, id)
      })
      .catch((err) => {
        return callback(err)
      })
    },

    // UPDATE A USER
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

    // GET CATEGORIES FOR THE NEW URL FORM IN THE PROFILE PAGE
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
