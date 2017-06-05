const ServiceModel = require('../models/ServiceModel')

module.exports = {
  list: function(req, res) {
    ServiceModel.find(function(err, Service) {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting ServiceDetails.',
          error: err
        })
      }
      return res.json(Service)
    })
  }
}
