'use strict'

const express        = require('express')
const router         = express.Router()


module.exports = (urlDataHelpers) => {

  //
  router.get('/:id', (req, res) => {
    // urlDataHelpers.getURL(1, (err, url) => {
      res.send(req.params.id)
    // })
  })


  return router;
}
