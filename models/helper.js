var mongoose = require('mongoose')
var bcrypt = require('bcrypt')

var helperSchema = new mongoose.Schema({
  local: {
    name: String,
    email: String,
    password: String
  }
})


var Helper = mongoose.model('Helper', helperSchema)

module.exports = Helper
