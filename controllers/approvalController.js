const { User, Form, Approval, Role } = require('../models');

class Controller {
    // FORM
    static getUserApproval(req, res) {
        Form.findAll({
            include: [{
                model: Approval,
                where: {
                    approvalStatus: false
                },
                order: [
                    [Approval, 'id', 'DESC']
                ],
                include: [{
                    model: User,
                    include: [{
                        model: Role,
                        where: {
                            position: {
                                [Op.lt]: req.isLogedIn.id
                            }
                        },
                    }]
                }]
            }]
        })
            .then(forms => {
                const verifiedApprove = []
                forms.forEach(item => {
                    item.Approvals.sort((a, b) => a.id - b.id)
                    let valid = true
                    let approvalToSend = null
                    if (item.Approvals.length) {
                        item.Approvals.forEach(approveDetail => {
                            if (valid) {
                                if (approveDetail.User) {
                                    valid = false
                                } else {
                                    if (approveDetail.UserId === req.isLogedIn.id) {
                                        approvalToSend = approveDetail
                                    }
                                }
                            }
                        })
                    }
                    if (approvalToSend) {
                        verifiedApprove.push(approvalToSend)
                    }
                })
                res.status(200).json(verifiedApprove)
            })
            .catch(err => {
                res.status(404).json({ message: `fail get approval` })
            })
    }
    // FORM
    static getApproveHistory(req, res) {
        Form.findAll({
            include: [{
                model: Approval,
                where: { UserId: req.isLogedIn.id }
            }]
        })
            .then(history => {
                res.status(200).json(history)
            })
            .catch(err => {
                res.status(404).json({ message: `fail get history` })
            })
    }
    // PINDAH KAN KE FORM CONTROLLER
    static create(req, res) {
        const newApproval = {
            UserId: req.isLogedIn.id,
            FormId: req.body.formId,
            approvalStatus: false
        }
        Approval.create(newApproval)
            .then(approvals => {
                res.status(201).json(approvals)
            })
            .catch(err => {
                res.status(400).json({ message: `fail create approval` })
            })
    }
    static editStatus(req, res) {
        Approval.update({ approvalStatus: true },
            { where: { id: req.params.id } })
            .then(approval => {
                res.status(200).json({
                    message: `success change approvalStatus to true`
                })
            })
            .catch(err => {
                res.status(404).json({ message: `fail edit approval` })
            })
    }
    static delete(req, res) {
        Approval.destroy({ where: { id: req.params.id } })
            .then(approval => {
                res.status(200).json({
                    message: `success delete approvalStatus`
                })
            })
            .catch(err => {
                res.status(404).json({ message: `fail delete approval` })
            })
    }
}

module.exports = Controller