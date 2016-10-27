var express = require('express')
var router = express.Router()
var passport = require('passport')
var moment = require('moment');
var fomatted_date = moment().format('YYYY-DD-MM');

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

router.get('/profile', isLoggedIn, function (req, res) {
  Task.find({tasker: req.user.id}).populate('helper').exec(function (err, taskList) {
    if (err) console.log (err)

    //res.send(taskList)
    res.render('taskers/profile', {
      taskList: taskList,
      user: req.user.local.name
      // date: req.body.local.task.date.slice(10, 5)
    })
  })
})



// get request for a submitted form
router.get('/profile/:id/edit', function (req, res) {
  Task.findOne({_id: req.params.id}, function(err, selectedTask) {
    res.render('tasks/edit', {
      selectedTask: selectedTask
    })
  })
})

// post request for a amended task
router.post('/profile/:id/edit', function (req, res) {
  // res.send('test')
  Task.findOne({_id: req.params.id}, function (err, amendTask) {
    if (err) {
      res.render('tasks/edit')
    } else {
      amendTask.title = req.body.task.title
      amendTask.description = req.body.task.description
      amendTask.date = req.body.task.date
      amendTask.time = req.body.task.time
      amendTask.location = req.body.task.location
      amendTask.save(function (err, amendedTask) {
        res.redirect('/taskers/profile')
      })
    }
  })
})

router.get('/profile/:id', function (req, res) {
  Task.findOne({_id: req.params.id}, function(err, deleteTask) {
    res.render('tasks/delete', {
      deleteTask: deleteTask
    })
  })
})
// delete request to remove task
router.delete('/profile/:id', function (req, res){
  Task.findOneAndRemove({_id: req.params.id}, function (err, deleteTask){
    if (err) {
      res.render('tasks/edit')
    } else {
      res.redirect('/taskers/profile')
    }
  })
})

// tasker log out request
router.get('/logout', function (req, res) {
  req.logout()
  res.redirect('/')
})

router.get('/', function (req, res) {
  res.render('/')
})

module.exports = router
