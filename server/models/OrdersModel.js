var mongoose = require('mongoose')
var Schema   = mongoose.Schema

var OrdersSchema = new Schema({
  'datetime_start' : Date,
  'datetime_end' : Date,
  'client' : {
    type: Schema.Types.ObjectId,
    ref: 'User'},
  'professional' : {
    type: Schema.Types.ObjectId,
    ref: 'User'}
})

module.exports = mongoose.model('Orders', OrdersSchema)
