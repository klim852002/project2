var mongoose = require('mongoose')
var bcrypt = require('bcrypt')

var helperSchema = new mongoose.Schema({
  local: {
    name: String,
    email: { type: String, required: true, unique: true },
    password: String
  }
})

helperSchema.statics.encrypt = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null)
}

var Helper = mongoose.model('Helper', helperSchema)

module.exports = Helper
