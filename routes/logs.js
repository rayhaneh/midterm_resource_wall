"use strict"

const express = require('express')
const router  = express.Router()
const md5     = require('md5')



module.exports = (userDataHelpers) => {

  // LOGIN GET ROUTE
  router.get("/login", (req, res) => {
    // If not login, render login form
    if (!req.currentUser.id) {
      res.render("login", {'currentUser': req.currentUser})
    }
    // else redirect to root route
    else {
      res.redirect("/")
    }
  })

  // LOGIN POST ROUTE
  router.post("/login", (req, res) => {
    // Get the user by email from the database
    userDataHelpers.getUser('email',req.body.email,(err, user)=>{
      if (err){
        return res.status(500).send('Database connection error.')
      }
      if (user.length === 0){
        return res.send('This email address is not registered.')
      }
      else if (user[0].password !== req.body.password) {
        return res.send('Email and password do not match.')
      } else {
        // If email and password match set a cookie
        req.session.user_id = user[0].id
        return res.status(200).send()
      }
    })
  })


  // REGISTRATION
  router.get("/register", (req, res) => {
    // If not logged in, render register form
    if (!req.currentUser.id) {
      res.render('register', {'currentUser': req.currentUser})
    }
    // else redirect to root route
    else {
      res.redirect("/")
    }
  })



  router.post("/register", (req, res) => {
    // Check if the email is already in the database
    userDataHelpers.getUser('email', String(req.body.email), (err, user) => {
      console.log('err',err,'user',user)
      if (err) {
        return res.status(500).send('Database connection error.')
      }
      if (user.length !== 0) {
        return res.send('This email address is already in use by another.')
      }
      let handle = req.body.email.split('@')[0]
      const avatarUrlPrefix = `https://vanillicon.com/${md5(handle)}`
      let newUser = {
        name     : req.body.name,
        email    : req.body.email,
        password : req.body.password,
        avatar   : `${avatarUrlPrefix}.png`
      }
      userDataHelpers.saveUser(newUser, (err, id) => {
        if (err) {
          return res.status(500).send('Database connection error.')
        }
        else {
          req.session.user_id = id[0]
          return res.status(200).send()
        }
      })
    })
  })

  // Logout
  router.post("/logout", (req, res) => {
    // Remove cookie
    req.session = null
    res.redirect("/login")
  })

  return router;
}







