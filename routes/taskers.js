var express = require('express')
var router = express.Router()
var passport = require('passport')

var Tasker = require('../models/tasker')
function authCheck (req, res, next) {
  // if req.isAuthenticated is false, then let it be

  // if it's true, redirect back to profile
  if (req.isAuthenticated()) {
    req.flash('signupMessage', 'You have logged in')
    return res.redirect('/profile')
  } else {
    return next()
  }
}
// using the local passport strategy for signup
router.route('/signup')
      .get(authCheck, function (req, res) {
        Tasker.find({}, function (err, allTaskers) {
          res.render('taskers/signup', {
            allTaskers: allTaskers,
            message: req.flash('signupMessage')
          })
        })
      })
      .post(passport.authenticate('local-signup', {
        successRedirect: '/taskers/profile',
        failureRedirect: '/taskers/signup',
        failureFlash: true
      }))
// using the local passport strategy for signup

// local passport strategy for authenticating login
router.route('/login')
      .get(function (req, res) {
        res.render('taskers/login', { message: req.flash('loginMessage') })
      })
      .post(passport.authenticate('local-login', {
        successRedirect: '/taskers/profile',
        failureRedirect: '/taskers/login',
        failureFlash: true
      }))
// local passport strategy for authenticating login

router.get('/profile', function (req, res) {
  // res.send(req.user)

  res.render('taskers/profile', { message: req.flash('loginMessage') })
})

router.get('/logout', function (req, res) {
  req.logout()
  res.redirect('/login')
})


module.exports = router
