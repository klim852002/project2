var express = require('express')
var router = express.Router()
var passport = require('passport')

var Helper = require('../models/helper')

router.get('/login', function(req, res) {
  res.render('helpers/login');
});

router.get('/signup', function(req, res) {
  res.render('helpers/signup');
});



module.exports = router
