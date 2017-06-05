const express = require('express')
const router = express.Router()
const ServicesController = require('../controllers/ServicesController')

router.get('/', ServicesController.list)

module.exports = router
