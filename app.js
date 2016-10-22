var express = require('express')
var app = express()
var layout = require('express-ejs-layouts')
var bodyParser = require('body-parser')
var morgan = require ('morgan')
var flash = require('connect-flash')
var session = require('express-session')
var passport = require('passport')
var MongoStore = require ('connect-mongo')(session)

var dotenv = require('dotenv')

var mongoose = require('mongoose')
mongoose.Promise = global.Promise
