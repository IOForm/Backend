const { Form, User, Role } = require('../models');

class AdminController {
    static async dashboardData(req, res) {
        const formData = await Form.findAll()
        const staffData = await User.findAll()
        const roleData = await Role.findAll()
        res.status(200).json({ formData, staffData, roleData })
    }

    static staffData(req, res) {
        User.findAll({
            include: Role
        })
            .then(data => res.status(200).json(data))
            .catch(err => res.status(500).json(err))
    }
}

module.exports = AdminController