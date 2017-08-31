'use strict'

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeURLDataHelpers(knex) {
  return {

    // GET A SINGLE URL
    getURL: function(id, callback) {
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
          'categories.name as categoryname')
        .from('urls')
        .innerJoin('categories', 'urls.cat_id', 'categories.id')
        .where('urls.id', '=', id)
        .then((urls) => {
          return callback(null, urls)
        })
        .catch((err) => {
          return callback(err)
        })
    },

    // GET ALL THE URLS
    getURLs: function(searchText, callback) {
      if (!searchText) {
        knex
        .select("*")
        .from("urls")
        .then((urls) => {
          console.log('1*****', urls)
          return callback(null, urls)
        })
        .catch((err) => {
          console.log('2*****', err)
          return callback(err)
        })
      }
      else {
        knex
        .select("*")
        .from("urls")
        .where('url', 'like', `%${searchText}%`)
        .orWhere('title', 'like', `%${searchText}%`)
        .orWhere('description', 'like', `%${searchText}%`)
        .then((urls) => {
          console.log('3*****', urls)
          return callback(null, urls)
        })
        .catch((err) => {
          console.log('4*****', err)
          return callback(err)
        })
      }
    },


    // ADD A NEW URL
    saveURL: function(url, callback) {
      knex("urls")
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
        .select(
          'comments.id',
          'comments.content',
          'comments.user_id',
          'comments.url_id',
          'comments.rating',
          'users.name',
          'users.email',
          'users.avatar')
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

    // SAVE A NEW COMMENT
    saveComment: function(comment, callback) {
      console.log(comment)
      knex('comments')
      .insert(comment)
      .returning('id')
      .then((id) => {
        console.log(id)
        return callback(null, id)
      })
      .catch((err) => {
        console.log(err)
        return callback(err)
      })
    },


    // GET LIKE COUNT
    countLikes: function(url_id, callback) {
      knex('likes')
        .count('user_id as num')
        .where('url_id', '=', url_id)
      .then((result) =>{
        callback(null,result[0].num)
        })
      .catch((err) => {
        return callback(err)
      })
    },


    // UPDATE (ADD/REMOVE) LIKES
    updateLikes: function(like, callback) {
      knex('likes')
      .select('*')
      .where(like)
      .then((result) => {
        if (result.length === 0) {
          return knex('likes')
          .insert(like)
        }
        else {
          return knex('likes')
          .where(like)
          .del()
        }
      })
      .then(() => {
        knex('likes')
          .count('user_id as num')
          .where('url_id', '=', like.url_id)
        .then((result) =>{
          callback(null,result[0].num)
          })
      })
      .catch((err) => {
        return callback(err)
      })
    },


    // UPDATE OVERALLRATING (AFTER A NEW REVIEW IS SUBMITTED)
    updateOverallRating: function (urlid, callback) {
      knex('comments')
        .avg('rating as avg')
        .where('url_id', '=', urlid)
        .then((result) => {
          return knex('urls')
            .where('id', '=', urlid)
            .update({
              overallRating  : Math.round(result[0].avg)
            })
        })
        .then(() => {
          callback(null)
        })
        .catch((err) => {
          callback(err)
        })
    },


  }
}
