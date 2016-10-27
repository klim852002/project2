var mongoose = require('mongoose')

var taskSchema = new mongoose.Schema({
    title: String,
    description: String,
    date: Date,
    time: String,
    location: String,
    tasker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tasker' },
    helper: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Helper' },
    message: {
      type: String,
      default: null}
})

var Task = mongoose.model('Task', taskSchema)

module.exports = Task
