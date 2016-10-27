var express = require('express')
var router = express.Router()

var Task = require('../models/task')

router.get('/', function (req, res) {
  Task.find({}, function (err, allTasks) {
    res.json(allTasks)
  })
})

router.get('/:id', function (req, res) {
  // res.send('requested id is ' + req.params.id)
  Task.findOne({ '_id': req.params.id }, function (err, tasks) {
    res.json(tasks)
  })
})


module.exports = router
