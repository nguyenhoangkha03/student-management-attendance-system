const db = require('../config/db');
const crypto = require('crypto');

const Login = {
    loginByUser: (username, password, callback) => {
        // Băm mật khẩu tại server
        const hashedPassword = crypto.createHash('md5').update(password).digest('hex');
        
        db.query('SELECT * FROM tai_khoan WHERE username = ? AND password = ?', [username, hashedPassword], callback);
    },
};

module.exports = Login;
