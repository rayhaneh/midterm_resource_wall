exports.seed = function(knex, Promise) {
  return knex('comments').del()

    .then(function () {
      return knex('URLs').del()
    })

    .then(function () {
      return knex('users').del()
    })

    // then create users
    .then(function () {
      console.log("create users")
      return knex('users').insert({id: 1, name: 'Alice'})
      // knex('users').insert({id: 2, name: 'Bob'}),
      // knex('users').insert({id: 3, name: 'Charlie'})
    })

    // wait for users to be inserted into the database so they will get ids
    // then create urls
    .then(function () {
      console.log("create urls")
      return  knex('URLs').insert(
        {id: 1, Desc: 'this is it', URL: 'http://google.com', cat_id: 1, Title: 'google', user_id: 1}
      )
    })

    // wait for urls to be inserted into the database so they will get ids
    .then(function(){
      // then create comments
      console.log("create comments")
      return knex('comments').insert(
        {id: 1, content: 'this is it', user_id: 1, url_id: 1, rating: 1}
      )
    })
};
