const express = require('express');
const router = express.Router();
const resultController = require('../controllers/resultController');

router.get('/:sinhVienId', resultController.getResultById);

router.get('/course', resultController.getCourses);

module.exports = router;
