"use strict"

const express = require('express')
const router  = express.Router()
const bcrypt  = require('bcrypt')
const md5     = require('md5')



module.exports = (knex) => {

  // Login
  router.get("/login", (req, res) => {
    // If not login, render login form
    if (!req.currentUser) {

      res.render("login", {user: ""})

    }
    // else redirect to root route
    else {
      res.redirect("/")
    }
  })
  router.post("/login", (req, res) => {
    console.log(req.body.email, req.body.password)
    // for now donot check the credentials! Just login!
    req.session.email = req.body.email
    res.redirect("/")
  })

  // Registration
  router.get("/register", (req, res) => {
    // If not login, render register form
    if (!req.currentUser) {
      res.render('register', {user: ""})
    }
    // else redirect to root route
    else {
      res.redirect("/")
    }
  })
  router.post("/register", (req, res) => {
    // check if the user email is already in the database

    const avatarUrlPrefix = `https://vanillicon.com/${md5('@test')}`
    let user = {
      name     : req.body.name,
      email    : req.body.email,
      password : bcrypt.hashSync(req.body.password,10),
      avatar   : `${avatarUrlPrefix}.png`
    }
    // saveUser(user, (err) => {
    //   if (err) {
    //     // Fix this later
    //     res.send('Error while connecting to the database.')
    //   }
    //   else {
    //     req.session.email = req.body.email
    //     res.redirect("/")
    //   }
    // })

  })

  // Logout
  router.post("/logout", (req, res) => {
    req.session = null
    res.redirect("/login")
  })

  return router;
}
