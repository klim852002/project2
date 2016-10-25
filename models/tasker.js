var mongoose = require('mongoose')
var bcrypt = require('bcrypt')

var taskerSchema = new mongoose.Schema({
  local: {
    name: String,
    email: { type: String, required: true, unique: true },
    password: String
  }
})

taskerSchema.pre('save', function (next) {
  var tasker = this
  bcrypt.genSalt(function (err, salt) {
    if (err) return next(err)

    bcrypt.hash(tasker.local.password, salt, function (err, hash) {
      if (err) return next(err)

      tasker.local.password = hash
      next()
    })
  })
})

taskerSchema.methods.auth = function (givenPassword, callback) {
  console.log('given password is ' + givenPassword)
  console.log('saved password is ' + this.local.password)
  var hashedPassword = this.local.password

  bcrypt.compare(givenPassword, hashedPassword, function (err, isMatch) {
    callback(err, isMatch)
  })
}

var Tasker = mongoose.model('Tasker', taskerSchema)

module.exports = Tasker
