var OrdersModel = require('../models/OrdersModel.js')

module.exports = {

  list: function(req, res) {
    OrdersModel.find(function(err, Orderss) {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting Orders.',
          error: err
        })
      }
      return res.json(Orderss)
    })
  },


  show: function(req, res) {
    var id = req.params.id
    OrdersModel.findOne({
      _id: id
    }, function(err, Orders) {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting Orders.',
          error: err
        })
      }
      if (!Orders) {
        return res.status(404).json({
          message: 'No such Orders'
        })
      }
      return res.json(Orders)
    })
  },

  create: function(req, res) {
    var orders = new OrdersModel({
      datetime_start: req.body.datetime_start,
      datetime_end: req.body.datetime_end,
      client: req.body.client,
      professional: req.body.professional
    })

    orders.save(function(err, orders) {
      if (err) {
        return res.status(500).json({
          message: 'Error when creating Orders',
          error: err
        })
      }
      return res.status(201).json(orders)
    })
  },

  update: function(req, res) {
    var id = req.params.id
    OrdersModel.findOne({
      _id: id
    }, function(err, Orders) {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting Orders',
          error: err
        })
      }
      if (!Orders) {
        return res.status(404).json({
          message: 'No such Orders'
        })
      }

      Orders.datetime_start = req.body.datetime_start ? req.body.datetime_start : Orders.datetime_start
      Orders.datetime_end = req.body.datetime_end ? req.body.datetime_end : Orders.datetime_end
      Orders.client = req.body.client ? req.body.client : Orders.client
      Orders.professional = req.body.professional ? req.body.professional : Orders.professional
      Orders.save(function(err, Orders) {
        if (err) {
          return res.status(500).json({
            message: 'Error when updating Orders.',
            error: err
          })
        }

        return res.json(Orders)
      })
    })
  },

  remove: function(req, res) {
    var id = req.params.id
    OrdersModel.findByIdAndRemove(id, function(err, Orders) {
      if (err) {
        return res.status(500).json({
          message: 'Error when deleting the Orders.',
          error: err
        })
      }
      return res.status(204).json()
    })
  }
}
