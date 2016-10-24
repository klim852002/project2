var mongoose = require('mongoose')
var bcrypt = require('bcrypt')

var taskerSchema = new mongoose.Schema({
  local: {
    name: String,
    email: { type: String, required: true, unique: true },
    password: String
  }
})

taskerSchema.statics.encrypt = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null)
}

var Tasker = mongoose.model('Tasker', taskerSchema)

module.exports = Tasker
