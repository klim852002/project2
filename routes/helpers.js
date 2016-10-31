var express = require('express')
var router = express.Router()
var passport = require('passport')

var Helper = require('../models/helper')
var Task = require('../models/task')

function authCheck(req, res, next) {
  // if req.isAuthenticated is false, then let it be

  // if it's true, redirect back to profile
  if (req.isAuthenticated()) {
    req.flash('signupMessage', 'You have logged in')
    return res.redirect('/helpers/profile')
  } else {
    return next()
  }
}

function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
    return next()
      // otherwise redirect them to the home page
  res.redirect('/')
}
// using the local passport strategy for signup
router.route('/signup')
  .get(authCheck, function(req, res) {
    Helper.find({}, function(err, allHelpers) {
      res.render('helpers/signup', {
        allHelpers: allHelpers,
        message: req.flash('signupMessage')
      })
    })
  })
  .post(passport.authenticate('helper-signup', {
    successRedirect: '/helpers/profile',
    failureRedirect: '/helpers/signup',
    failureFlash: true
  }))
// using the local passport strategy for signup

// local passport strategy for authenticating login
router.route('/login')
  .get(function(req, res) {
    res.render('helpers/login', {
      message: req.flash('loginMessage')
    })
  })
  .post(passport.authenticate('helper-login', {
    successRedirect: '/helpers/profile',
    failureRedirect: '/helpers/login',
    failureFlash: true
  }))
  // local passport strategy for authenticating login

router.get('/profile', isLoggedIn, function(req, res) {
    Task.find({
      helper: req.user.id
    }).populate('tasker').exec(function(err, taskList) {
      if (err) console.log(err)
      res.render('helpers/profile', {
        taskList: taskList,
        user: req.user.local.name
      })
    })
  })


  // , { message: req.flash('loginMessage') }

router.get('/logout', function(req, res) {
  req.logout()
  res.redirect('/')
})

// router.get('/', function (req, res) {
//   res.render('/')
// })
// get request to render helpers signup page
// router.get('/signup', function (req, res) {
//   res.render('helpers/signup')
// });
//
// router.post('/signup', function(req, res) {
//   Helper.create(req.body.helper, function (err, helper) {
//     if (err) {
//       res.send('an err during creation' + err)
//     } else {
//       // res.redirect('/helpers')
//       // res.send('successful')
//       res.redirect('/')
//     }
//   })
// })
// router.get('/login', function (req, res) {
//   res.render('helpers/login')
// })

// }).get('/:id', function (req, res) {
//   res.send('ROUTES GOES HERE INSTEAD')
// }).get('/:id/edit', function (req, res) {


// ===
// setting the route to homepage
// app.get('/path-name', callback(request, response)) NO
// use router.get instead
// ===
module.exports = router
