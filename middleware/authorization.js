const { Cart, Product } = require('../models');

function authorization(req, res, next) {
    Product.findByPk(req.params.product_id)
        .then(() => {
            if (req.isLogedIn.role === 'admin') {
                next()
            } else {
                next({
                    name: 'Unauthorized'
                })
            }
        })
        .catch(err => {
            next({
                name: 'Unauthorized'
            })
        })
}

module.exports = authorization