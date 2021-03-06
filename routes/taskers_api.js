var express = require('express')
var router = express.Router()

var Tasker = require('../models/tasker')

router.get('/', function (req, res) {
  Tasker.find({}, function (err, allTaskers) {
    res.json(allTaskers)
    // res.send(req.body)
  })
})

router.get('/:id', function (req, res) {
  // res.send('requested id is ' + req.params.id)
  Tasker.findOne({ '_id': req.params.id }, function (err, tasker) {
    res.json(tasker)
  })
})
//
//
router.post('/', function (req, res) {
  res.json(req.body)
  Tasker.create(req.body.user, function (err, newTasker) {
    console.log('new tasker created')
    res.json(newTasker)
  })
})

module.exports = router
