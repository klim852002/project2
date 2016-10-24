var LocalStrategy = require('passport-local').Strategy

var Tasker = require('../models/tasker')

module.exports = function (passport) {
  passport.serializeUser(function (tasker, done) {
    done(null, tasker.id)
  })

  passport.deserializeUser(function (id, done) {
    Tasker.findById(id, function (err, tasker) {
      done(err, tasker)
    })
  })
// passport declaring the signup strategy to use taking 2 arguments, name and strategy
  passport.use('local-signup', new LocalStrategy({
    usernameField: 'tasker[local][email]',
    passwordField: 'tasker[local][password]',
    passReqToCallback: true
  }, function (req, email, password, next) {
    // the authentication flow on our local auth routes
    console.log(req.body)
    process.nextTick(function () {
      // local.email is the given email
      Tasker.findOne({'local.email': email }, function (err, foundTasker) {
        // if user is found, dont create new user
        // if user is not found, create new user

        if (err) return next(err)
      // below, null means no error, and false indicates no user object to be created
        if (foundTasker) {
          return next(null, false, req.flash('signupMessage', 'Email has been taken'))
        } else {
          Tasker.create(req.body.tasker, function (err, newTasker) {
            if (err) throw err
            return next(null, newTasker)
          })
        }
      })
    })
  }))

  passport.use('local-login', new LocalStrategy({
    usernameField: 'tasker[local][email]',
    passwordField: 'tasker[local][password]',
    passReqToCallback: true
  }, function (req, email, password, next) {
    console.log('authenticating with given email and password')
    console.log(email, password)

    Tasker.findOne({ 'local.email': email }, function (err, foundTasker) {
      if (err) return next(err)

    // if cannot find use by email, return to route with flash message
    if (!foundTasker)
      return next(null, false, req.flash('loginMessage', 'No user found with this email'))

      foundTasker.auth(password, function (err, authenticated) {
        if (err) return next(err)

        if (authenticated) {
          return next(null, foundTasker, req.flash('loginMessage', 'Hello logged in user ' + foundTasker.local.name))
        } else {
          return next(null, false, req.flash('loginMessage', 'Password don\'t match'))
        }
      })
    })
  }))
}
