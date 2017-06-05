var express = require('express')
var router = express.Router()
var AddressController = require('../controllers/AddressController')

router.get('/', AddressController.list)
router.get('/:id', AddressController.show)
router.post('/create', AddressController.create)
router.put('/:id', AddressController.update)
router.delete('/:id', AddressController.remove)

module.exports = router
