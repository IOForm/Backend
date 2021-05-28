const { Role } = require('../models');

class Controller {
    static show(req, res) {
        Role.findAll()
            .then(roles => {
                res.status(200).json(roles)
            })
            .catch(err => {
                res.status(404).json({ message: `fail find` })
            })
    }
    static create(req, res) {
        const { role, position } = req.body
        Role.create({
            role: role,
            position: position
        })
            .then(role => {
                res.status(201).json({
                    id: role.id,
                    role: role.role,
                    position: role.position
                })
            })
            .catch(err => {
                res.status(400).json({ message: `fail create role` })
            })
    }
    static findOne(req, res) {
        Role.findByPk(req.params.id)
            .then(roles => {
                res.status(200).json(roles)
            })
            .catch(err => {
                res.status(404).json({ message: `Not Found` })
            })
    }
    static edit(req, res) {
        const { role, position } = req.body
        Role.update({
            role: role,
            position: position
        }, { where: { id: req.params.id } })
            .then(role => {
                res.status(200).json({
                    id: role.id,
                    role: role.role,
                    position: role.position
                })
            })
            .catch(err => {
                res.status(400).json({ message: `fail create role` })
            })
    }
    static delete(req, res) {
        Role.destroy({ where: { id: req.params.id } })
            .then(result => {
                res.status(200).json(`success delete`)
            })
            .catch(err => {
                res.status(404).json({ message: `Not Found` })
            })
    }
}

module.exports = Controller