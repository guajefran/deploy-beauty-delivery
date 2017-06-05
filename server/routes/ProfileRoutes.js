var express = require('express')
var router = express.Router()
var ProfileController = require('../controllers/ProfileController')
const upload = require('../config/multer');

router.get('/', ProfileController.list)
router.get('/:id', ProfileController.findByUser)
// router.get('/:id', ProfileController.show)
router.post('/create', ProfileController.create)
router.post('/upload', upload.array('files'), ProfileController.upload)
router.put('/:id', ProfileController.update)
router.delete('/:id', ProfileController.remove)


module.exports = router
