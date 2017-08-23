'use strict'

const express        = require('express')
const router         = express.Router()
var request = require('request');
var fs      = require('fs');


module.exports = (urlDataHelpers) => {

  // SHOW ALL URLS (VISITORS CAN ACCESS THIS PAGE)
  router.get('/', (req, res) => {
    console.log('the search text is: ',req.query.searchText)
    urlDataHelpers.getURLs(req.query.searchText,(err, urls) => {
      console.log('urls', urls)
      if (err) {
        return res.send('Error while connecting to the database.')
      }
      res.render('show_urls', {'urls': urls, 'currentUser': req.currentUser})
    })
  })

  // ADD A NEW URL
  router.post('/', (req, res) => {
    if (req.currentUser.email){
      let newURL            = req.body.newURL
      newURL.user_id        = req.currentUser.id
      newURL.cat_id         = Number(newURL.cat_id)
      newURL.overallRating  = Number(newURL.overallRating)
      newURL.image          = ''

      let key = '5999af0c8116d0cb15d2da6aeb47c10fee170ae37ec89'
      let apiLink = `http://api.linkpreview.net/?key=${key}&q=${newURL.URL}`

      request(apiLink, function (error, response, body) {
        let parsedBody = JSON.parse(body)
        if (parsedBody){
          newURL.image = parsedBody.image
        }
        urlDataHelpers.saveURL(newURL, (err, id) => {
          if (err) {
            return res.status(500).send('Error while connecting to the database.')
          }
            else {
              return res.status(201).send()
          }
        })
      })
    }
  })

  // SHOW ONE SPECIFIC URL
  router.get('/:id', (req, res) => {
    urlDataHelpers.getURL(req.params.id, (err, url) => {
      if (err) {
        return res.send('Error while connecting to the database.1')
      }
      res.render('show_url',{'url': url[0], 'currentUser': req.currentUser})
    })
  }),


  // SEARCH IN THE DATABASE
  router.get('/search/:text', (req, res) => {
    urlDataHelpers.search(req.params.text, (err, urls) => {
      if(err) {
        return res.send('Error while connecting to the database.2')
      }
      else {
        res.send({'urls': urls})
      }
    })
  }),


  router.get('/:id/comments', (req, res) => {
    urlDataHelpers.getComments(req.params.id, (err, comments) => {
      if (err) {
        return res.status(500).send('Error while connecting to the database.3')
      }
      return res.json(comments)
    })
  }),


  router.post('/:id/comments', (req, res) => {
    let comment = {
      content : req.body.content,
      url_id  : Number(req.params.id),
      user_id : req.currentUser.id,
      rating  : Number(req.body.rating)
    }

    urlDataHelpers.saveComment(comment, (err, id) => {
      if (err) {
        return res.status(500).send('Error while connecting to the database.4')
      }
      urlDataHelpers.updateOverallRating(Number(req.params.id), (err) => {

        if (err) {
          return res.status(500).send('Error while connecting to the database.77')
        }
        return res.status(200).send()
      })
    })

  })


  router.get('/:id/likes', (req, res) => {
    urlDataHelpers.countLikes(Number(req.params.id), (err, count) => {
      if (err) {
        return res.status(500).send({'error':'Error while connecting to the database.5'})
      }
      else {
        return res.status(200).send({'likecount': count})
      }
    })
  })



  router.post('/:id/likes', (req, res) => {
    let like = {
      user_id : req.currentUser.id,
      url_id  : Number(req.params.id),
    }
    urlDataHelpers.updateLikes(like, (err, count) => {
      if (err) {
        return res.status(500).send({'error':'Error while connecting to the database.6'})
      }
      else {
        return res.status(200).send({'likecount': count})
      }
    })
  })



  return router
}






