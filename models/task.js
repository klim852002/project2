var mongoose = require('mongoose')

var taskSchema = new mongoose.Schema({
    title: String,
    description: String,
    date: Date,
    time: String,
    location: String,
    helper:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Helper' },
    tasker:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tasker' }
})

var Task = mongoose.model('Task', taskSchema)

module.exports = Task
