var express = require('express')
var router = express.Router()
var passport = require('passport')

var Helper = require('../models/helper')

router.get('/signup', function(req, res) {
  res.render('helpers/signup');
});

router.post('/signup', function(req, res) {
  Helper.create(req.body.helper, function (err, helper) {
    if (err) {
      res.send('an err during creation' + err)
    } else {
      // res.redirect('/helpers')
      res.send('successful')
    }
  })
    // res.send(req.body)
})
// var newMovie = new Movie({
//   name: req.body.newmovie.name,
//   year: req.body.newmovie.year,
//   rating: 4
// })
//
// newMovie.save(function (err) {
//   if (err) throw new Error(err)
// })
// res.send(newMovie)
// })


router.get('/login', function(req, res) {
  res.render('helpers/login');
});


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
