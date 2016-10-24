var express = require('express')
var router = express.Router()


var Task = require('../models/task')


router.get('/newtask', function (req, res) {
  res.render('tasks/newtask')
});

router.post('/newtask', function(req, res) {

  Task.create(req.body.task, function (err, task) {
    if (err) {
      res.send('an err during creation' + err)
    } else {
      // res.redirect('/profile')
        res.send('successful')
        // res.redirect('/')
    }
  })
})


module.exports = router
