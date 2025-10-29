const express = require('express')
const router = express.Router()
const facultyController = require('../controllers/facultyController')

router.get('/list', facultyController.getAllStudents)
router.post('/add', facultyController.addStudent)

module.exports = router