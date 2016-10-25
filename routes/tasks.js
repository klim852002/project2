var express = require('express')
var router = express.Router()


var Task = require('../models/task')

// get request to render form for new task
router.get('/newtask', function (req, res) {
  res.render('tasks/newtask')
});
// post request to create new task
router.post('/newtask', function (req, res) {
  Task.create(req.body.task, function (err, task) {
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
