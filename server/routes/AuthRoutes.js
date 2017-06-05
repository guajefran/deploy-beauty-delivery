var express = require('express')
var router = express.Router()
var AuthController = require('../controllers/AuthController')


router.post('/signup', AuthController.signup)
router.post('/login', AuthController.login)
router.post('/logout', AuthController.logout)
router.get('/loggedin', AuthController.loggedin)
router.get('/private', AuthController.private)


module.exports = router
