var express = require('express')
var router = express.Router()
var OrdersController = require('../controllers/OrdersController.js')

router.get('/', OrdersController.list)
router.get('/:id', OrdersController.show)
router.post('/', OrdersController.create)
router.put('/:id', OrdersController.update)
router.delete('/:id', OrdersController.remove)

module.exports = router
