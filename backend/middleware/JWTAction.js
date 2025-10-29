require('dotenv').config()
const jwt = require('jsonwebtoken')

const createJWT = () => {
    let token = null
    try {
        let token = jwt.sign({ name: 'kha' }, process.env.JWT_SECRET)
    }
    catch(err) {
        console.log(err)
    }
    console.log(token)
    return token;
}

const verifyJWT = (token) => {
    try {
        let decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log(decoded)
    }
    catch(err) {
        console.log(err)
    }
}


module.exports = { createJWT }