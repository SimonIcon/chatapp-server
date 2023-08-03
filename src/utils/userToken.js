const jwt = require('jsonwebtoken')

const createToken = (id) => {
    const jwtKey = process.env.JWT_SECRET_KEY;
    return jwt.sign({ id }, jwtKey, { expiresIn: "3d" })
}

module.exports = createToken