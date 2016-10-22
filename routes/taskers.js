var express = require('express')
var router = express.Router()
var passport = require('passport')

var Tasker = require('../models/tasker')

router.get('/login', function(req, res) {
  res.render('taskers/login');
});

router.get('/signup', function(req, res) {
  res.render('taskers/signup');
});






module.exports = router
