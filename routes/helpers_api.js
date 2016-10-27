var express = require('express')
var router = express.Router()

var Helper = require('../models/helper')

router.get('/', function (req, res) {
  Helper.find({}, function (err, allHelpers) {
    res.json(allHelpers)
    // res.send(req.body)
  })
})

router.get('/:id', function (req, res) {
  // res.send('requested id is ' + req.params.id)
  Helper.findOne({ '_id': req.params.id }, function (err, helper) {
    res.json(helper)
  })
})
//
//
router.post('/', function (req, res) {
  res.json(req.body)
  Helper.create(req.body.user, function (err, newHelper) {
    console.log('new helper created')
    res.json(newHelper)
  })
})

module.exports = router
