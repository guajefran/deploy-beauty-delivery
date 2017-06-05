var mongoose = require('mongoose')
var Schema   = mongoose.Schema

var ProfileSchema = new Schema({
  'company' : String,
  'description' : String,
  'professional' : {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  'img': []
})

module.exports = mongoose.model('Profile', ProfileSchema)
