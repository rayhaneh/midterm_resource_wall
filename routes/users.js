'use strict'

const express = require('express');
const router  = express.Router();

module.exports = (userDataHelpers) => {

  // SHOW A SPECIFIC USER
  router.get('/:id', (req, res) => {
    userDataHelpers.getUser('id', req.params.id, (err, user) => {
      if (err) {
        return res.send('Error while connecting to the database.')
      }
      else {
        userDataHelpers.getUserURLs(user[0].id, (err, urls) => {
          if (err) {
            return res.send('Error while connecting to the database.')
          }
          res.render('profile', {'user': user[0], 'urls': urls})
        })
      }
    })
  }),


  // GET ALL URLS OF ONE USER AS A JSON FILE (To be used in ajax call while loading all URLS)
  router.get('/:id/urls', (req, res) => {
    userDataHelpers.getUserURLs(req.params.id, (err, urls) => {
      if (err) {
        res.status(500).json({ error: err.message })
      }
      res.json(urls)

    })
  })

  // router.get('/', (req, res) => {
  //   knex
  //     .select('*')
  //     .from("users")
  //     .then((results) => {
  //       res.json(results)
  //   })
  // })

  return router;
}
