var LocalStrategy = require('passport-local').Strategy

var Tasker = require('../models/tasker')
var Helper = require('../models/helper')
// for sessions
module.exports = function (passport) {
  passport.serializeUser(function (tasker, done) {
    done(null, tasker.id)
  })

  passport.deserializeUser(function (id, done) {
    Tasker.findById(id, function (err, tasker) {
      if (tasker) {
        done(err, tasker)
      } else {
        Helper.findById(id, function (err, helper) {
          done(err, helper)
        })
      }
    })
  })
// passport declaring the signup strategy for tasker taking 2 arguments, name and strategy
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
      console.log(foundTasker)
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

  // passport declaring the signup strategy for helper taking 2 arguments, name and strategy
    passport.use('helper-signup', new LocalStrategy({
      usernameField: 'helper[local][email]',
      passwordField: 'helper[local][password]',
      passReqToCallback: true
    }, function (req, email, password, next) {
      // the authentication flow on our local auth routes
      console.log(req.body)
      process.nextTick(function () {
        // local.email is the given email
        Helper.findOne({'local.email': email }, function (err, foundHelper) {
          // if user is found, dont create new user
          // if user is not found, create new user

          if (err) return next(err)
        // below, null means no error, and false indicates no user object to be created
          if (foundHelper) {
            return next(null, false, req.flash('signupMessage', 'Email has been taken'))
          } else {
            Helper.create(req.body.helper, function (err, newHelper) {
              if (err) throw err
              return next(null, newHelper)
            })
          }
        })
      })
    }))


// below this is login authentication for helper
  passport.use('helper-login', new LocalStrategy({
    usernameField: 'helper[local][email]',
    passwordField: 'helper[local][password]',
    passReqToCallback: true
  }, function (req, email, password, next) {
    console.log('authenticating with given email and password')
    console.log(email, password)

    Helper.findOne({ 'local.email': email }, function (err, foundHelper) {
      if (err) return next(err)

    // if cannot find use by email, return to route with flash message
    if (!foundHelper)
      return next(null, false, req.flash('loginMessage', 'No user found with this email'))
      console.log(foundHelper)
      foundHelper.auth(password, function (err, authenticated) {
        if (err) return next(err)

        if (authenticated) {
          return next(null, foundHelper, req.flash('loginMessage', 'Hello logged in user ' + foundHelper.local.name))
        } else {
          return next(null, false, req.flash('loginMessage', 'Password don\'t match'))
        }
      })
    })
  }))
}
