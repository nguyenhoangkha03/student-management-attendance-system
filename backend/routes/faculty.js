const express = require('express')
const router = express.Router()
const facultyController = require('../controllers/facultyController')


router.get('/list', facultyController.getAllFaculties)
router.post('/add', facultyController.addFaculty)
router.delete('/delete/:id', facultyController.deleteFaculty)
router.put('/update/:id', facultyController.updateFaculty);
router.get('/:id', facultyController.getFacultyById);

module.exports = router