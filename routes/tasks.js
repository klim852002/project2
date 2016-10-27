var express = require('express')
var router = express.Router()

var Task = require('../models/task')
var Tasker = require('../models/tasker')
var Helper = require('../models/helper')

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

router.get('/helperlist', function (req, res) {
  Task.find({}, function (err, allTasks) {
    console.log(allTasks)
    res.render('tasks/helperlist', {
      allTasks: allTasks
    })
  })
})

router.get('/:id/message', function (req, res) {
  Task.findOne({_id: req.params.id}, function(err, viewTask) {
      res.render('tasks/message', {
          viewTask: viewTask
      })
  })
})

router.post('/:id/message', function (req, res) {
  Task.findOne ({_id: req.params.id}, function (err, leaveMsg)
  {
    if (err) {
      res.send('cannot leave message')
    } else {
        // console.log(user)
        leaveMsg.helper=req.user.id
        leaveMsg.message=req.body.task.message
        leaveMsg.save(function (err, leaveMsg) {
          res.redirect('/helpers/profile')
        })
      }
  })
})
// below is stable for individual task comment.
// router.get('/:id/message', function (req, res) {
//   Task.findOne({_id: req.params.id}, function(err, viewTask) {
//     if (err) {
//       console.log(err)
//     } else {
//       // res.render('tasks/message')
//       // viewTask: viewTask
//       res.send('hi')
//     }
//   })
// })

// router.get('/profile/:id/edit', function (req, res) {
//   Task.findOne({_id: req.params.id}, function(err, selectedTask) {
//     res.render('tasks/edit', {
//       selectedTask: selectedTask
//     })
//   })
// })

module.exports = router
