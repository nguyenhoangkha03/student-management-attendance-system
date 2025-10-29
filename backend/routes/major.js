const express = require('express')
const router = express.Router()
const majorController = require('../controllers/majorController')

router.get('/list', majorController.getAllMajors)
router.post('/add', majorController.addMajor)
router.delete('/delete/:id', majorController.deleteMajor)
router.put('/update/:id', majorController.updateMajor);
router.get('/:id', majorController.getMajoryById);

module.exports = router