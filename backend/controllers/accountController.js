const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const Account = require('../models/accountModel')
require('dotenv').config()

const saltRounds = 10

exports.getAllAccounts = (req, res) => {
    Account.getAll((err, result) => {
        if(err) return res.status(500).json({ error: err.message })
        res.json(result)
    })
}

exports.getAllTeacherAccounts = (req, res) => {
    Account.getAllTeacher((err, result) => {
        if(err) return res.status(500).json({ error: err.message })
        res.json(result)
    })
}

exports.getAllStudentAccounts = (req, res) => {
    Account.getAllStudent((err, result) => {
        if(err) return res.status(500).json({ error: err.message })
        res.json(result)
    })
}

exports.getAllManagerAccounts = (req, res) => {
    Account.getAllManager((err, result) => {
        if(err) return res.status(500).json({ error: err.message })
        res.json(result)
    })
}

exports.addAccount = (req, res) => {
    const { username, password, vai_tro, trang_thai, id_giang_vien, id_sinh_vien, id_manager } = req.body

    bcrypt.hash(password, saltRounds, (err, hash) => {
        if(err) return res.status(500).json({ error: 'Error hash' })
        Account.add({ username, password: hash, vai_tro, trang_thai, id_giang_vien, id_sinh_vien, id_manager }, (err, result) => {
            if(err) return res.status(500).json({ error: err.message })
            res.json({ message: 'Add new account successfully', id: result.insertId})
        })
    })
}

exports.deleteAccount= (req, res) => {
    const id = req.params.id
    Account.delete(id, (err, result) => {
        if(err) return res.status(500).json({ error: err.message })
        res.json({ message: 'Delete a Account successfully', id})
    })
}

exports.updateAccount = (req, res) => {
    const id = req.params.id
    const { username, password, vai_tro, trang_thai, id_giang_vien, id_sinh_vien, id_manager } = req.body
    bcrypt.hash(password, saltRounds, (err, hash) => {
        if(err) return res.status(500).json({ error: 'Error hash' })

        Account.update(id, { username, password: hash, vai_tro, trang_thai, id_giang_vien, id_sinh_vien, id_manager }, (err, result) => {
            if(err) return res.status(500).json({ error: err.message })
            res.json({ message: 'Update account successfully', affectedRows: result.affectedRows})
        })
    })
}

exports.getAccountyById = (req, res) => {
    const id = req.params.id
    Account.getById(id, (err, result) => {
      if (err) return res.status(500).json({ error: err.message })
      if (result.length === 0) return res.status(404).json({ message: 'Account not found' })
      res.json(result[0])
    })
}

exports.updatePassword = (req, res) => {
    const { username, password } = req.body
    bcrypt.hash(password, saltRounds, (err, hash) => {
        if(err) return res.status(500).json({ error: 'Error hash' })

        Account.updatePassword({ username, password: hash }, (err, result) => {
            if(err) return res.status(500).json({ error: err.message })
            res.json({ message: 'Update account successfully', affectedRows: result.affectedRows})
        })
    })
}

exports.login = (req, res) => {
    const { username, password } = req.body
    Account.getByUsername(username, (err, result) => {
        if (err) return res.status(500).json({ error: err.message })
        if (result.length === 0) return res.status(404).json({ message: 'Account not found' })
        
        const user = result[0]
        
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) return res.status(500).json({ error: "Error comparing password" })

            if (!isMatch) {
                return res.status(401).json({ error: "Sai mật khẩu!" })
            }

            let id = ''

            if(user.vai_tro === 'manager'){
                id = user.id_manager
            }
            else if(user.vai_tro === 'teacher'){
                id = user.id_giang_vien
            }
            else {
                id = user.id_sinh_vien
            }

            const token = jwt.sign(
                { id: user.id, username: user.username, vai_tro: user.vai_tro, id_author: id },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            )

            res.json({ message: "Success", token })
        })
    })
}