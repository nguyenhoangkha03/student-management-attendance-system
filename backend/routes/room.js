const express = require('express')
const router = express.Router()
const roomController = require('../controllers/roomController')


router.get('/list', roomController.getAllRooms)
router.post('/add', roomController.addRoom)
router.delete('/delete/:id', roomController.deleteRoom)
router.put('/update/:id', roomController.updateRoom);
router.get('/:id', roomController.getRoomById);

module.exports = router