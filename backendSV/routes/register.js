const express = require('express');
const router = express.Router();
const registerCourseController = require('../controllers/registerCourseController');

router.get('/', registerCourseController.getAllCourses);
router.get('/registers/:id', registerCourseController.getAllRegisterById);

router.get('/lophocphan', registerCourseController.getLopHocPhanBySemester);
router.get('/semesters', registerCourseController.getSemesters);

router.post('/', registerCourseController.registerCourse);
router.delete('/', registerCourseController.deleteRegisterById);

module.exports = router;
