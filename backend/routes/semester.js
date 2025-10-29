const express = require('express')
const router = express.Router()
const semesterController = require('../controllers/semesterController')


router.get('/list', semesterController.getAllSemesters)
router.post('/add', semesterController.addSemester)
router.delete('/delete/:id', semesterController.deleteSemester)
router.put('/update/:id', semesterController.updateSemester);
router.get('/:id', semesterController.getSemesterById);

module.exports = router