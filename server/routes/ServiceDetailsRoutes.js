const express = require('express')
const router = express.Router()
const ServiceDetailsController = require('../controllers/ServiceDetailsController')

router.get('/', ServiceDetailsController.list)
router.get('/:id', ServiceDetailsController.listByUser)
// router.get('/:id', ServiceDetailsController.show)
router.post('/', ServiceDetailsController.create)
router.put('/:id', ServiceDetailsController.update)
router.delete('/:id', ServiceDetailsController.remove)

module.exports = router
