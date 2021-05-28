const { User } = require('../models');
const { verifyPassword } = require('../helper/bcrypt');
const { createToken } = require('../helper/jwt');

class Controller {
    static register(req, res, next) {
        const newUser = {
            name: req.body.name,
            username: req.body.username,
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
        const { username, password } = req.body
        let foundUser
        User.findOne({
            where: { username: username }
        })
            .then(user => {
                foundUser = user
                if (user) {
                    return verifyPassword(password, user.password)
                } else {
                    res.status(404).json({ message: `fail login` })
                }
            })
            .then(hashResult => {
                if (hashResult) {
                    const access_token = createToken({
                        id: foundUser.id,
                        username: foundUser.username
                    });
                    res.status(200).json({
                        id: foundUser.id,
                        username: foundUser.username,
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