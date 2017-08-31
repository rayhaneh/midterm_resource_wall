exports.seed = function(knex, Promise) {
  return knex('comments').del()
    .then(function () {
      return knex('likes').del()
    })
    .then(function () {
      return knex('urls').del()
    })
    .then(function () {
      return knex('categories').del()
    })
    .then(function () {
      return knex('users').del()
    })


    // then create users
    .then(function () {
      return Promise.all([
        knex('users').insert({id: 1, name: 'Alice', email:'alice@cool.com', password:'alice', avatar:'https://vanillicon.com/8ef313b1a62a78c9066aace9a1061b39.png'}),
        knex('users').insert({id: 2, name: 'Bob', email:'bob@mail.com', password:'bob', avatar:'https://vanillicon.com/b7ef7e9117491321ffb55bee54c8deed.png'}),
        knex('users').insert({id: 3, name: 'Charlie', email:'charlie@mail.com', password:'charlie', avatar:'https://vanillicon.com/7c8db9682ee40fd2f3e5d9e71034b717.png'}),
        knex('users').insert({id: 4, name: 'Mark', email:'mark@mail.com', password:'mark', avatar:'https://vanillicon.com/7c8db9682ee40fd2f3e5d9e71034b717.png'})
      ])
    })
    // wait for users to be inserted into the database so they will get ids
    .then(function(){
      // then create categories
      return Promise.all([
        knex('categories').insert({id: 1, name: 'Tech & Coding'}),
        knex('categories').insert({id: 2, name: 'Creative Arts & Media'}),
        knex('categories').insert({id: 3, name: 'Health & Psycology'}),
        knex('categories').insert({id: 4, name: 'History'}),
        knex('categories').insert({id: 5, name: 'Languages & Culture'}),
        knex('categories').insert({id: 6, name: 'Law'}),
        knex('categories').insert({id: 7, name: 'Literature'}),
        knex('categories').insert({id: 8, name: 'Nature & Environment'}),
        knex('categories').insert({id: 9, name: 'Politics & the Modern World'}),
        knex('categories').insert({id: 10, name: 'Science, Engineering & Math'}),
        knex('categories').insert({id: 11, name: 'Study Skills'}),
        knex('categories').insert({id: 12, name: 'Teaching'}),
        knex('categories').insert({id: 13, name: 'Business & Management'}),
        knex('categories').insert({id: 14, name: 'Other'})
      ])
    })
    // then create urls
    .then(function () {
      let lorem1 = 'Letter wooded direct two men indeed income sister. Impression up admiration he by partiality is. Instantly immediate his saw one day perceived. Old blushes respect but offices hearted minutes effects. Written parties winding oh as in without on started. Residence gentleman yet preserved few convinced. Coming regret simple longer little am sister on. Do danger in to adieus ladies houses oh eldest. Gone pure late gay ham. They sigh were not find are rent.'
      let lorem2 = 'Sociable on as carriage my position weddings raillery consider. Peculiar trifling absolute and wandered vicinity property yet. The and collecting motionless difficulty son. His hearing staying ten colonel met. Sex drew six easy four dear cold deny. Moderate children at of outweigh it. Unsatiable it considered invitation he travelling insensible. Consulted admitting oh mr up as described acuteness propriety moonlight.'
      let lorem3 = 'Do commanded an shameless we disposing do. Indulgence ten remarkably nor are impression out. Power is lived means oh every in we quiet. Remainder provision an in intention. Saw supported too joy promotion engrossed propriety. Me till like it sure no sons. '
      let lorem4 = 'Silent sir say desire fat him letter. Whatever settling goodness too and honoured she building answered her. Strongly thoughts remember mr to do consider debating. Spirits musical behaved on we he farther letters. Repulsive he he as deficient newspaper dashwoods we. Discovered her his pianoforte insipidity entreaties. Began he at terms meant as fancy. Breakfast arranging he if furniture we described on. Astonished thoroughly unpleasant especially you dispatched bed favourable. '
      return Promise.all([
        knex('urls').insert({id: 1, description: lorem1, url: 'https://www.khanacademy.org/', cat_id: 1, title: 'Khan Academy', user_id: 1, overallRating: 4, image: 'https://cdn.kastatic.org/images/khan-logo-vertical-transparent.png'}),
        knex('urls').insert({id: 2, description: lorem3, url: 'http://themillions.com/', cat_id: 7, title: 'The Millions', user_id: 2, overallRating: 5, image: 'https://pbs.twimg.com/profile_images/1869348290/m_logo-whiteonorange.gif'}),
        knex('urls').insert({id: 3, description: lorem2, url: 'https://www.codeschool.com/', cat_id: 1, title: 'Code School', user_id: 1, overallRating: 3, image: 'https://www.codeschool.com/assets/meta/og-avatar-541739b5880b8586eeb033747a8a2cf3e689860d59b506d29a9633aed86d057d.png'}),
      ])
    })
    // wait for urls to be inserted into the database so they will get ids
    .then(function(){
      // then create comments
      let comment1 = 'Unfeeling so rapturous discovery he exquisite. Reasonably so middletons or impression by terminated. Old pleasure required removing elegance him had.'
      let comment2 = 'No depending be convinced in unfeeling he. Excellence she unaffected and too sentiments her. Rooms he doors there ye aware in by shall. Education remainder in so cordially. His remainder and own dejection daughters sportsmen. Is easy took he shed to kind. '
      let comment3 = 'Its sometimes her behaviour are contented. Do listening am eagerness oh objection collected. Together gay feelings continue juvenile had off one. Unknown may service subject her letters one bed. Child years noise ye in forty.'
      let comment4 = 'Arrived compass prepare an on as. Reasonable particular on my it in sympathize. Size now easy eat hand how. Unwilling he departure elsewhere dejection at. Heart large seems may purse means few blind. Exquisite newspaper attending on certainty oh suspicion of.'
      let comment5 = 'Received the likewise law graceful his. Nor might set along charm now equal green. Pleased yet equally correct colonel not one. Say anxious carried compact conduct sex general nay certain. Mrs for recommend exquisite household eagerness preserved now.'
      return Promise.all([
      knex('comments').insert({id: 1, content: comment1, user_id: 2, url_id: 1, rating: 5}),
      knex('comments').insert({id: 2, content: comment2, user_id: 3, url_id: 1, rating: 3}),
      knex('comments').insert({id: 3, content: comment3, user_id: 4, url_id: 1, rating: 4}),
      knex('comments').insert({id: 4, content: comment2, user_id: 1, url_id: 2, rating: 5}),
      knex('comments').insert({id: 5, content: comment2, user_id: 1, url_id: 3, rating: 3}),
      ])
    })
    .then(function(){
      // then create likes
      return Promise.all([
        knex('likes').insert({user_id: 1, url_id: 1}),
        knex('likes').insert({user_id: 2, url_id: 1}),
        knex('likes').insert({user_id: 3, url_id: 1}),
        knex('likes').insert({user_id: 1, url_id: 2}),
        knex('likes').insert({user_id: 2, url_id: 2}),
        knex('likes').insert({user_id: 3, url_id: 3}),
      ])
    })
};
