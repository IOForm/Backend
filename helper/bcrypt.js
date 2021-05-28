const bcrypt = require('bcrypt');
const salt = +process.env.SALT_NUMBER

function hashPassword(password) {
    return bcrypt.hashSync(password, salt)
}

function verifyPassword(password, hashedPassword) {
    return bcrypt.compareSync(password, hashedPassword)
}

module.exports = { hashPassword, verifyPassword }