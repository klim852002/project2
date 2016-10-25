var express = require('express')
var router = express.Router()

var Task = require('../models/task')
var Tasker = require('../models/tasker')

// get request to render form for new task
router.get('/newtask', function (req, res) {
  // res.send(req.user)
  res.render('tasks/newtask')
})
// post request to create new task
router.post('/newtask', function (req, res) {
  // Task.create(req.body.task, function
  console.log(req.user)
  var newTask = new Task({
    title: req.body.task.title,
    description: req.body.task.description,
    date: req.body.task.date,
    time: req.body.task.time,
    location: req.body.task.location,
    tasker: req.user.id
  })
  newTask.save(function (err, task) {
    if (err) {
      res.send('an err during creation' + err)
    } else {
      // res.redirect('/profile')
      // res.send('successful')
      res.redirect('/taskers/profile')
    }
  })
})
// get request to render all Task listings
router.get('/listings', function (req, res) {
  Task.find({}, function (err, allTasks) {
    console.log(allTasks)
    res.render('tasks/listings', {
      allTasks: allTasks
    })
  })
})

module.exports = router
