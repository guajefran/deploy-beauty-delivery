var mongoose = require('mongoose')
var Schema   = mongoose.Schema

var ServiceSchema = new Schema({
  'name' : String,
  'category' :{
    type: String,
    enum:[
      'peluquería',
      'coloración',
      'manicura/pedicura',
      'maquillaje',
      'estética facial',
      'depilación',
      'beauty party'
    ]}
})

module.exports = mongoose.model('Service', ServiceSchema)
