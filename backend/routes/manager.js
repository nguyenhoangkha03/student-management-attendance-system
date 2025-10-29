const express = require('express')
const multer = require('multer')
const router = express.Router()
const managerController = require('../controllers/managerController')

const storage = multer.memoryStorage()
const upload = multer({ storage })

router.get('/list', managerController.getAllManagers)
router.post('/add', upload.single('image'), managerController.addManager)
router.delete('/delete/:id', managerController.deleteManager)
router.put('/update/:id', upload.single('image'), managerController.updateManager)
router.get('/:id', managerController.getManagerById)

module.exports = router