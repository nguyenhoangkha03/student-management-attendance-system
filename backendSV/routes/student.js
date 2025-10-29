const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// Hàm các chức năng student 
router.get('/', studentController.getAllStudents);
router.get('/:id', studentController.getStudent);
router.post('/', studentController.addStudent);
router.put('/', studentController.updateStudent);
router.put('/changePassword', studentController.changePassword);

// Hàm chức năng xem điểm số



module.exports = router;
