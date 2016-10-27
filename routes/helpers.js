var express = require('express')
var router = express.Router()
var passport = require('passport')

var Helper = require('../models/helper')
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
        Helper.find({}, function (err, allHelpers) {
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
      .get(function (req, res) {
        res.render('helpers/login', { message: req.flash('loginMessage') })
      })
      .post(passport.authenticate('helper-login', {
        successRedirect: '/helpers/profile',
        failureRedirect: '/helpers/login',
        failureFlash: true
      }))
// local passport strategy for authenticating login

router.get('/profile', function (req, res) {
  Task.find({helper: req.user.id}).populate('tasker').exec(function (err, taskList) {
    if (err) console.log(err)

    res.render('helpers/profile', {
      taskList: taskList,
      user: req.user.local.name
    })
  })
})
// , { message: req.flash('loginMessage') }

router.get('/logout', function (req, res) {
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

// READ ROUTES

// // All the GET requests
// router.get('/', function (req, res) {
//   // all users view under INDEX.EJS
//   res.render('users/index')
// }).get('/new', function (req, res) {
//   // NEW route under NEW.EJS
//   res.render('users/new')
// }).get('/:id', function (req, res) {
//   res.send('ROUTES GOES HERE INSTEAD')
// }).get('/:id/edit', function (req, res) {
//  // {
//  //  name: 'glen',
//  //  password: 'glen123'
//  // }
//
//  // connect to the database
//  // retrieve it by the id
//  // store it in a variable
//  // pass it over to the view
//   var userdata = {
//     name: 'glen chooooooo',
//     password: 'glen123'
//   }
//
//   res.render('users/edit', userdata)
//   // res.send('edit user\'s ' + req.params.id + ' details')
// })
//
// // the only POST request
// router.post('/', function (req, res) {
//   // get the post parameter
//   // {
//   // username: "primaulia",
//   // userpassword: "test123"
//   // }
//   // var posted_username = req.body.username
//   // var posted_password = req.body.userpassword
//   res.send(req.body)
//   // res.send('posted username is ' + posted_username + ' and posted password is: ' + posted_password)
// })
//
// // only PUT request
// router.put('/:id', function (req, res) {
//   res.send('SHOULDVE GONE HERE')
// })
//
// // DELETE ROUTES
// router.delete('/:id', function (req, res) {
//   res.send('delete user' + req.params.id)
// })

// ===
module.exports = router
