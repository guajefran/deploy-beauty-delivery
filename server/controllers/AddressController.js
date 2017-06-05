var AddressModel = require('../models/AddressModel')

module.exports = {

  list: function(req, res) {
    AddressModel.find(function(err, AddressModels) {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting AddressModel.',
          error: err
        })
      }
      return res.json(AddressModels)
    })
  },

  show: function(req, res) {
    var id = req.params.id
    AddressModel.findOne({
      _id: id
    }, function(err, AddressModel) {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting AddressModel.',
          error: err
        })
      }
      if (!AddressModel) {
        return res.status(404).json({
          message: 'No such AddressModel'
        })
      }
      return res.json(AddressModel)
    })
  },

  create: function(req, res) {
    var addressModel = new AddressModel({
      raw: req.body.raw,
      lat: req.body.lat,
      lng: req.body.lng,
      user: req.body.user
    })

    addressModel.save(function(err, addressModel) {
      if (err) {
        return res.status(500).json({
          message: 'Error when creating AddressModel',
          error: err
        })
      }
      return res.status(201).json(addressModel)
    })
  },

  update: function(req, res) {
    var id = req.params.id
    AddressModel.findOne({
      _id: id
    }, function(err, AddressModel) {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting AddressModel',
          error: err
        })
      }
      if (!AddressModel) {
        return res.status(404).json({
          message: 'No such AddressModel'
        })
      }

      AddressModel.raw = req.body.raw ? req.body.raw : AddressModel.raw
      AddressModel.lat = req.body.lat ? req.body.lat : AddressModel.lat
      AddressModel.lng = req.body.lng ? req.body.lng : AddressModel.lng
      AddressModel.user = req.body.user ? req.body.user : AddressModel.user
      AddressModel.save(function(err, AddressModel) {
        if (err) {
          return res.status(500).json({
            message: 'Error when updating AddressModel.',
            error: err
          })
        }

        return res.json(AddressModel)
      })
    })
  },

  remove: function(req, res) {
    var id = req.params.id
    AddressModel.findByIdAndRemove(id, function(err, AddressModel) {
      if (err) {
        return res.status(500).json({
          message: 'Error when deleting the AddressModel.',
          error: err
        })
      }
      return res.status(204).json()
    })
  }
}
