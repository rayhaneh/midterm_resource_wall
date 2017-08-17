'use strict'

const express        = require('express')
const router         = express.Router()


module.exports = (urlDataHelpers) => {


  router.get('/', (req, res) => {
    urlDataHelpers.getURLs((err, urls) => {
      if (err) {
        return res.send('Error while connecting to the database.')
      }
      res.render('show_urls', {'urls': urls})
    })
  })


  router.get('/:id', (req, res) => {
    urlDataHelpers.getURL(req.params.id, (err, url) => {
      if (err) {
        return res.send('Error while connecting to the database.')
      }
      res.render('show_url',{'url': url[0]})
    })
  })


  return router;
}
