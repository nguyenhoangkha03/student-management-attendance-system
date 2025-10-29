const express = require('express')
const router = express.Router()
const rollCallController = require('../controllers/rollCallController')

router.get('/list', rollCallController.getAllRollCalls)
router.post('/add', rollCallController.addRollCall)
router.delete('/delete/:id', rollCallController.deleteRollCall)
router.put('/update/:id', rollCallController.updateRollCall);
router.get('/:id', rollCallController.getRollCallById);

module.exports = router