var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var AddressModelSchema = new Schema({
  'raw' : String,
  'lat' : Number,
  'lng' : Number,
  'user' : {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

module.exports = mongoose.model('AddressModel', AddressModelSchema);
