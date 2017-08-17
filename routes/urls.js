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

  //
  router.get('/:id', (req, res) => {
    urlDataHelpers.getURL(1, (err, url) => {
      console.log(url)
      res.send(req.params.id)
    })
  })


  return router;
}
