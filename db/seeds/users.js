exports.seed = function(knex, Promise) {
  return knex('comments').del()
    .then(function () {
      return knex('likes').del()
    })
    .then(function () {
      return knex('categories').del()
    })
    .then(function () {
      return knex('URLs').del()
    })
    .then(function () {
      return knex('users').del()
    })


    // then create users
    .then(function () {
      return Promise.all([
        knex('users').insert({id: 1, name: 'Alice', email:'alice@cool.com', password:'alice', avatar:'https://vanillicon.com/8ef313b1a62a78c9066aace9a1061b39.png'}),
        knex('users').insert({id: 2, name: 'Bob', email:'bob@mail.com', password:'bob', avatar:'https://vanillicon.com/b7ef7e9117491321ffb55bee54c8deed.png'}),
        knex('users').insert({id: 3, name: 'Charlie', email:'charlie@mail.com', password:'charlie', avatar:'https://vanillicon.com/7c8db9682ee40fd2f3e5d9e71034b717.png'})
      ])
    })
    // wait for users to be inserted into the database so they will get ids
    // then create urls
    .then(function () {
      return Promise.all([
        knex('URLs').insert({id: 1, Desc: 'this is it', URL: 'http://google.com', cat_id: 1, Title: 'Google', user_id: 1, overallRating: 4}),
        knex('URLs').insert({id: 2, Desc: 'this is it', URL: 'http://facebook.com', cat_id: 1, Title: 'Facebook', user_id: 1, overallRating: 3}),
      ])
    })
    // wait for urls to be inserted into the database so they will get ids
    .then(function(){
      // then create comments
      return knex('comments').insert(
        {id: 1, content: 'this is it', user_id: 1, url_id: 1, rating: 1}
      )
    })
    .then(function(){
      // then create comments
      return knex('likes').insert(
        {user_id: 1, url_id: 1}
      )
    })
    .then(function(){
      // then create comments
      return knex('categories').insert(
        {id: 1, name: 'BACON'}
      )
    })
};
