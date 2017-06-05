var mongoose = require('mongoose')
var Schema   = mongoose.Schema

var ServiceDetailsSchema = new Schema({
  'time' : String,
  'price' : Number,
  'description' : String,
  'service' : {
    type: Schema.Types.ObjectId,
    ref: 'Service'},
  'professional' : {
    type: Schema.Types.ObjectId,
    ref: 'User'},
  'profile': {
    type: Schema.Types.ObjectId,
    ref: 'Profile'}
})

module.exports = mongoose.model('ServiceDetails', ServiceDetailsSchema)
