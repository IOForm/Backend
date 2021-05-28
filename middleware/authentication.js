const { createToken, verifyUser } = require('../helper/jwt');
const { User } = require('../models');

function authentication(req, res, next) {
    const access_token = req.headers.access_token

    if (access_token) {
        let loginUser = verifyUser(access_token)
        User.findOne({
            where: { email: loginUser.email }
        })
            .then(user => {
                if (user) {
                    req.isLogedIn = {
                        id: user.id,
                        email: user.email,
                        role: user.role
                    }
                    next()
                } else {
                    res.status(404)
                }
            })
            .catch(err => {
                res.status(404)
            })
    } else {
        res.status(404)
    }
}

module.exports = authentication