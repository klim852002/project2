var express = require('express')
var router = express.Router()
var passport = require('passport')

var Tasker = require('../models/tasker')
var Task = require('../models/task')
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

function isLoggedIn (req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
    return next()
  // otherwise redirect them to the home page
  res.redirect('/')
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
        failureRedirect: '/test',
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
        failureRedirect: '/test2',
        failureFlash: true
      }))
// local passport strategy for authenticating login

router.get('/profile', isLoggedIn, function (req, res) {
  Task.find({'tasker': req.user}, function (err, taskList) {
    res.render('taskers/profile', {
      taskList: taskList,
      user: req.user.local.name
    })
  })
  // .populate()
  // this return in json format
  // res.send(req.user)
  // need to search user by id
  // Tasker.find({}, req.body._id)
  // res.render('taskers/profile', { message: req.flash('loginMessage') })
})

router.get('/profile/:id', function (req, res) {
  Task.findOne({_id: req.params.id}, function(err, selectedTask) {
    res.render('tasks/edit', {
      selectedTask: selectedTask,
    })
  })
})
// put/post request to edit task
// router.

// delete request to remove task


router.get('/logout', function (req, res) {
  req.logout()
  res.redirect('/')
})

router.get('/', function (req, res) {
  res.render('taskers/index')
})

module.exports = router
