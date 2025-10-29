const express = require('express')
const multer = require('multer')
const router = express.Router()
const teacherController = require('../controllers/teacherController')

const storage = multer.memoryStorage()
const upload = multer({ storage })

router.get('/list', teacherController.getAllTeachers)
router.post('/add', upload.single('image'), teacherController.addTeacher)
router.delete('/delete/:id', teacherController.deleteTeacher)
router.put('/update/:id', upload.single('image'), teacherController.updateTeacher)
router.get('/:id', teacherController.getTeacherById)

module.exports = router