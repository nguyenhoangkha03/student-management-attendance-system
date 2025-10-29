const express = require('express')
const router = express.Router()
const subjectController = require('../controllers/subjectController')


router.get('/list', subjectController.getAllSubjects)
router.post('/add', subjectController.addSubject)
router.delete('/delete/:id', subjectController.deleteSubject)
router.put('/update/:id', subjectController.updateSubject);
router.get('/:id', subjectController.getSubjectById);

module.exports = router