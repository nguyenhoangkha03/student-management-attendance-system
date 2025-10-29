const express = require('express')
const router = express.Router()
const accountController = require('../controllers/accountController')

router.get('/list', accountController.getAllAccounts)
router.get('/list/teacher', accountController.getAllTeacherAccounts)
router.get('/list/student', accountController.getAllStudentAccounts)
router.get('/list/manager', accountController.getAllManagerAccounts)
router.post('/add', accountController.addAccount)
router.delete('/delete/:id', accountController.deleteAccount)
router.put('/update/:id', accountController.updateAccount)
router.get('/:id', accountController.getAccountyById)
router.post('/login', accountController.login)
router.post('/update-password', accountController.updatePassword)

module.exports = router