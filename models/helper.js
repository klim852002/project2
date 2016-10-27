var mongoose = require('mongoose')
var bcrypt = require('bcrypt')

var helperSchema = new mongoose.Schema({
  local: {
    name: String,
    email: { type: String, required: true, unique: true },
    password: String
  }
})

helperSchema.pre('save', function (next) {
  var helper = this
  bcrypt.genSalt(function (err, salt) {
    if (err) return next(err)

    bcrypt.hash(helper.local.password, salt, function (err, hash) {
      if (err) return next(err)

      helper.local.password = hash
      next()
    })
  })
})

helperSchema.methods.auth = function (givenPassword, callback) {
  console.log('given password is ' + givenPassword)
  console.log('saved password is ' + this.local.password)
  var hashedPassword = this.local.password

  bcrypt.compare(givenPassword, hashedPassword, function (err, isMatch) {
    callback(err, isMatch)
  })
}

var Helper = mongoose.model('Helper', helperSchema)

module.exports = Helper
