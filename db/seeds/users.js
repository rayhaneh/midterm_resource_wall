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
      return knex('users').insert({id: 1, name: 'Alice', email:'iphone@cool.com', password:'wooohoo', avatar:'picture'})
      // knex('users').insert({id: 2, name: 'Bob'}),
      // knex('users').insert({id: 3, name: 'Charlie'})
    })
    // wait for users to be inserted into the database so they will get ids
    // then create urls
    .then(function () {
      return  knex('URLs').insert(
        {id: 1, Desc: 'this is it', URL: 'http://google.com', cat_id: 1, Title: 'google', user_id: 1}
      )
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
