'use strict'

const express        = require('express')
const router         = express.Router()


module.exports = (urlDataHelpers) => {

  // SHOW ALL URLS
  router.get('/', (req, res) => {
    urlDataHelpers.getURLs((err, urls) => {
      if (err) {
        return res.send('Error while connecting to the database.')
      }
      res.render('show_urls', {'urls': urls})
    })
  })

  // ADD A NEW URL
  router.post('/', (req, res) => {
    let newURL     = req.body.newURL
    newURL.user_id = req.currentUser
    newURL.cat_id  = Number(newURL.cat_id)
    //console.log("I'm in post")
    urlDataHelpers.saveURL(newURL, (err) => {
      //console.log("I'm in post", err)
      if (err) {
        return res.status(500).send('Error while connecting to the database.')
      }
      else {
        return res.status(201).send()
      }
    })
  })

  // SHOW ONE SPECIFIC URL
  router.get('/:id', (req, res) => {
    urlDataHelpers.getURL(req.params.id, (err, url) => {
      if (err) {
        return res.send('Error while connecting to the database.')
      }
      res.render('show_url',{'url': url[0]})
    })
  }),

  router.get('/search/:text', (req, res) => {
    urlDataHelpers.search(req.body.searchText, (err, urls) => {
      if(err) {
        return res.send('Error while connecting to the database.')
      }
      else {
        res.render("results", {'urls': urls})
      }
    })

  })




  return router
}
