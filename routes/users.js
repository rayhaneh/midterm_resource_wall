'use strict'

const express = require('express');
const router  = express.Router();

module.exports = (userDataHelpers) => {

  // SHOW A SPECIFIC USER
  router.get('/:id', (req, res) => {
    if (req.currentUser.id == req.params.id){ // Do not use triple equal here
      userDataHelpers.getUser('id', req.params.id, (err, user) => {
        if (err) {
          return res.send('Error while connecting to the database.7')
        }
        else {
          userDataHelpers.getCategories((err, categories) => {
            if (err) {
              return res.send('Error while connecting to the database.8')
            }
            else {
              userDataHelpers.getUserURLs(user[0].id, (err, urls) => {
                if (err) {
                  return res.send('Error while connecting to the database.9')
                }
                res.render('profile', {'user': user[0], 'categories': categories, 'currentUser': req.currentUser})
              })
            }
          })
        }
      })
    }
    else {
      res.redirect('/urls')
    }
  }),


  // GET ALL URLS OF ONE USER AS A JSON FILE (To be used in ajax call while loading all URLS)
  router.get('/:id/urls', (req, res) => {
    userDataHelpers.getUserURLs(req.params.id, (err, urls) => {
      if (err) {
        res.status(500).json({ error: err.message })
      }
      res.json(urls)
    })
  }),



  router.put('/:id', (req, res) => {
    userDataHelpers.updateUser(req.body.id, req.body.name, req.body.email, (err) => {
      if (err) {
        return res.status(500).send('Error while connecting to the database.10')
      }
      return res.status(200).send()
    })
  })




  return router;
}
