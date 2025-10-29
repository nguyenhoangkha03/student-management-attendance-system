const express = require('express')
const router = express.Router()
const classController = require('../controllers/classController')

router.get('/list', classController.getAllClasses)
router.post('/add', classController.addClass)
router.delete('/delete/:id', classController.deleteClass)
router.put('/update/:id', classController.updateClass);
router.get('/:id', classController.getClassyById);
router.get('/semester/:id', classController.getClassyByIdSemester);

module.exports = router