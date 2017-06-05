var ServiceDetailsModel = require('../models/ServiceDetailsModel.js')

module.exports = {

  list: function(req, res) {
    ServiceDetailsModel.find(function(err, ServiceDetailss) {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting ServiceDetails.',
          error: err
        })
      }
      return res.json(ServiceDetailss)
    }).populate({path: 'service', select: ['name', 'category']})
      .populate({path: 'professional', select: 'email'})
      .populate({path: 'profile', select: ['company', 'description']})
  },

  listByUser: function(req, res) {
    var id = req.params.id
    ServiceDetailsModel.find({
      professional: id
    }, function(err, ServiceDetails) {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting ServiceDetails.',
          error: err
        })
      }
      if (!ServiceDetails) {
        return res.status(404).json({
          message: 'No such ServiceDetails'
        })
      }
      return res.json(ServiceDetails)
    }).populate({path: 'service', select: ['name', 'category']})
      .populate({path: 'professional', select: 'email'})
      .populate({path: 'profile', select: ['company', 'description']})
  },

  // show: function(req, res) {
  //   var id = req.params.id
  //   ServiceDetailsModel.findOne({
  //     _id: id
  //   }, function(err, ServiceDetails) {
  //     if (err) {
  //       return res.status(500).json({
  //         message: 'Error when getting ServiceDetails.',
  //         error: err
  //       })
  //     }
  //     if (!ServiceDetails) {
  //       return res.status(404).json({
  //         message: 'No such ServiceDetails'
  //       })
  //     }
  //     return res.json(ServiceDetails)
  //   })
  // },

  create: function(req, res) {
    var serviceDetails = new ServiceDetailsModel({
      time: req.body.time,
      price: req.body.price,
      description: req.body.description,
      service: req.body.service,
      professional: req.body.professional,
      profile: req.body.profile
    })
    console.log(serviceDetails)
    serviceDetails.save(function(err, serviceDetails) {
      if (err) {
        return res.status(500).json({
          message: 'Error when creating ServiceDetails',
          error: err
        })
      }
      return res.status(201).json(serviceDetails)
    })
  },

  update: function(req, res) {
    var id = req.params.id
    ServiceDetailsModel.findOne({
      _id: id
    }, function(err, ServiceDetails) {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting ServiceDetails',
          error: err
        })
      }
      if (!ServiceDetails) {
        return res.status(404).json({
          message: 'No such ServiceDetails'
        })
      }

      ServiceDetails.time = req.body.time ? req.body.time : ServiceDetails.time
      ServiceDetails.price = req.body.price ? req.body.price : ServiceDetails.price
      ServiceDetails.description = req.body.description ? req.body.description : ServiceDetails.description
      ServiceDetails.service = req.body.service ? req.body.service : ServiceDetails.service
      ServiceDetails.professional = req.body.professional ? req.body.professional : ServiceDetails.serviceprofessional
      ServiceDetails.profile = req.body.profile ? req.body.profile : ServiceDetails.profile
      ServiceDetails.save(function(err, ServiceDetails) {
        if (err) {
          return res.status(500).json({
            message: 'Error when updating ServiceDetails.',
            error: err
          })
        }

        return res.json(ServiceDetails)
      })
    })
  },

  remove: function(req, res) {
    var id = req.params.id
    ServiceDetailsModel.findByIdAndRemove(id, function(err, ServiceDetails) {
      if (err) {
        return res.status(500).json({
          message: 'Error when deleting the ServiceDetails.',
          error: err
        })
      }
      return res.status(204).json()
    })
  }
}
