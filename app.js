var express = require('express')
var app = express()
var layout = require('express-ejs-layouts')
var bodyParser = require('body-parser')
var morgan = require('morgan')
var flash = require('connect-flash')
var session = require('express-session')
var passport = require('passport')
var MongoStore = require('connect-mongo')(session)
var methodOverride = require('method-override')

var dotenv = require('dotenv')

var mongoose = require('mongoose')
mongoose.Promise = global.Promise
// to remove once moving env
// mongoose.connect('mongodb://localhost/help-shop')

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.load({ path: '.env.' + process.env.NODE_ENV })
//
mongoose.connect(process.env.MONGO_URI)
app.use(morgan('dev'))
app.set('view engine', 'ejs')
app.use(layout)
app.use(session({
  secret: process.env.EXPRESS_SECRET,
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({
    url: process.env.MONGO_URI,
    autoReconnect: true
  })
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

// serve static files
app.use(express.static(__dirname + '/public'))

var taskersRoutes = require('./routes/taskers'
)
var helpersRoutes = require('./routes/helpers')
var tasksRoutes = require('./routes/tasks')
var taskersAPIRoutes = require('./routes/taskers_api')
var helpersAPIRoutes = require('./routes/helpers_api')
var tasksAPIRoutes = require('./routes/tasks_api')

app.use(bodyParser.json()) // to parse ajax json req
app.use(bodyParser.urlencoded({
  extended: true
})) // to parse form submitted data
app.use(methodOverride('_method'))
require('./config/passport')(passport)

// direct to /index
app.get('/', function (req, res) {
  res.render('index')
});

app.get('/about', function (req, res) {
  res.render('aboutus')
})
app.use('/taskers', taskersRoutes)
app.use('/helpers', helpersRoutes)
app.use('/tasks', tasksRoutes)
app.use('/api/taskers', taskersAPIRoutes)
app.use('/api/helpers', helpersAPIRoutes)
app.use('/api/tasks', tasksAPIRoutes)

app.listen(process.env.PORT || 4000)
// app.listen(4000)
console.log('Server started')
