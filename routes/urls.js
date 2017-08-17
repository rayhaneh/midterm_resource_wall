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
    let newURL = {
      URL: req.body.newURL
    }
    urlDataHelpers.saveURL(newURL, (err) => {
      if (err) {
        return res.send('Error while connecting to the database.',err)
      }
      else {
        return res.status(200).send('New URL has been added to the database.')
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
