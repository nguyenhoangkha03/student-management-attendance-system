const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const accountModel = require('../models/accountModel')

exports.login = (req, res) => {
    const { username, password } = req.body

    
} 