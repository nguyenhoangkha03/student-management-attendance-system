const express = require('express')
const router = express.Router()
const studentStudySectionController = require('../controllers/studentStudySectionController')

router.get('/list', studentStudySectionController.getAllStudentStudySections)
router.post('/add', studentStudySectionController.addStudentStudySection)
router.delete('/delete/:id', studentStudySectionController.deleteStudentStudySection)
router.put('/update/:id', studentStudySectionController.updateStudentStudySection)
router.put('/update/score/:id', studentStudySectionController.updateScore)
router.get('/:id', studentStudySectionController.getStudentStudySectionById)
router.get('/section/:id', studentStudySectionController.getByIdSection)

module.exports = router