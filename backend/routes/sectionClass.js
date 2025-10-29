const express = require('express')
const router = express.Router()
const sectionClassController = require('../controllers/sectionClassController')

router.get('/list', sectionClassController.getAllSectionClasses)
router.post('/add', sectionClassController.addSectionClass)
router.delete('/delete/:id', sectionClassController.deleteSectionClass)
router.put('/update/:id', sectionClassController.updateSectionClass);
router.get('/:id', sectionClassController.getSectionClassById);
router.get('/semester/:id', sectionClassController.getAllSectionClassesById);
router.get('/semester-student/:idSemester/:idStudent', sectionClassController.getAllJoinSectionClassesByIdSemesterAndIdStudent);
router.get('/semester-not-student/:idSemester/:idStudent', sectionClassController.getAllJoinSectionClassesByIdSemesterAndNotIdStudent);
router.get('/student/:idStudent', sectionClassController.getAllJoinGroupBySemesterSectionClassesByIdStudent);
router.get('/teacher/:idTeacher', sectionClassController.getAllSectionClassByIdTeacher);
router.get('/semester-teacher/:idSemester/:idTeacher', sectionClassController.getAllJoinSectionClassesByIdSemesterAndIdTeacher)

module.exports = router