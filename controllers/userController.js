const { User } = require('../models');
const { verifyPassword } = require('../helper/bcrypt');
const { createToken } = require('../helper/jwt');

class Controller {
    static register(req, res, next) {
        const newUser = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role
        }
        User.create(newUser)
            .then(user => {
                res.status(201).json({
                    id: user.id,
                    name: user.name,
                    role: user.role
                })
            })
            .catch(err => {
                res.status(400).json({ message: `fail create` })
            })
    }
    // LOGIN
    static login(req, res, next) {
        const { email, password } = req.body
        let foundUser
        User.findOne({
            where: { email: email }
        })
            .then(user => {
                foundUser = user.dataValues
                if (user) {
                    return verifyPassword(password, foundUser.password)
                } else {
                    res.status(404).json({ message: `fail login` })
                }
            })
            .then(hashResult => {
                if (hashResult) {
                    const access_token = createToken({
                        id: foundUser.id,
                        email: foundUser.email
                    });
                    res.status(200).json({
                        id: foundUser.id,
                        email: foundUser.email,
                        access_token
                    })
                } else {
                    res.status(404).json({ message: `fail login` })
                }
            })
            .catch(err => {
                res.status(404).json({ message: `fail login` })
            })
    }
}

module.exports = Controller