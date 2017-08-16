"use strict"

const express        = require('express');
const router         = express.Router();


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
    userDatahelpers.getUser('email',req.body.email,(err, user)=>{
      if (err){
        return res.send('database connection error')
      }
      if (user.length === 0){
        return res.send('email is not registered')
      }
      else if (!bcrypt.compareSync(user.password, req.body.password)) {
        return res.send('invalid password')
      } else {
        req.session.email = req.body.email
        res.redirect("/")
      }
    })

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
    // add the user to the database
    // for now just log user in
    req.session.email = req.body.email
    res.redirect("/")
  })

  // Logout
  router.post("/logout", (req, res) => {
    req.session = null
    res.redirect("/login")
  })

  return router;
}
