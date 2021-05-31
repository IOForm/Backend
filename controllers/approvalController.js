const { User, Form, Approval, Role } = require('../models');
const { Op } = require('sequelize');

class Controller {
    static getApproveHistory(req, res) {
        Approval.findAll({
            where: {
                UserId: req.isLogedIn.id,
                [Op.or]: [
                    { approvalStatus: true },
                    { rejected: true }
                ]
            },
            include: Form
        })
            .then(history => {
                res.status(200).json(history)
            })
            .catch(err => {
                res.status(404).json({ message: `fail get history` })
            })
    }

    static async getUserApproval(req, res) {
        try {
            const userData = await User.findOne({
                where: {id: req.isLogedIn.id},
                include: Role
            })
            const formList = await Form.findAll({
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
                            where: { position: {
                                [Op.lt] : userData.Role.position // req.loggedUser.position
                            } },
                        }]
                    }, {
                        model: Form
                    }]
                }]
            })
            const verifiedApprove = []
            formList.forEach(item => {
                item.Approvals.sort((a, b) => a.id - b.id)
                let valid = true
                let approvalToSend = null
                if (item.Approvals.length) {
                    item.Approvals.forEach(approveDetail => {
                        if (valid) {
                            if (approveDetail.User) {
                                valid = false
                            } else {
                                if (approveDetail.UserId === req.isLogedIn.id) { // User Id yg sedang login
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
            res.status(200).json(verifiedApprove.filter(item => !item.rejected))
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async formApprovalDetail(req, res) {
        try {
            const approvalId = req.params.id
            const formsData = await Approval.findOne({
                where: {
                    id: approvalId
                },
                include: Form
            })

            const formsApprovalList = await Approval.findAll({
                where: {
                    FormId: formsData.Form.id
                },
                include: [{
                    model: User,
                    include: [{
                        model: Role
                    }]
                }]
            })

            res.status(200).json({ form: formsData, approvals: formsApprovalList })
        } catch (error) {
            console.log(error)
        }
    }

    static async editStatus(req, res) {
        try {
            const updateApprovalData = await Approval.update({
                approvalStatus: true
            }, {
                where: {
                    id: req.params.id
                },
                returning: true
            })
            if (updateApprovalData[0]) {
                const approvalProgress = await Approval.findAll({
                    where: {
                        FormId: updateApprovalData[1][0].FormId
                    }
                })
                const formPending = approvalProgress.some(item => !item.approvalStatus)
                if (!formPending) {
                    Form.update({
                        formComplete: true
                    },{
                        where: {
                            id: updateApprovalData[1][0].FormId
                        }
                    })
                }
            }
        } catch (error) {
            res.status(404).json({ message: `fail edit approval` })
        }
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

    static async rejectApproval(req, res) {
        try {
            const updateApprovalData = await Approval.update({
                rejected: true
            }, {
                where: {
                    id: req.params.id
                },
                returning: true
            })
            const updateFormData = await Form.update({
                formComplete: true
            },{
                where: {
                    id: updateApprovalData[1][0].FormId
                }
            })
            res.status(200).json({ message: `form rejected` })
        } catch (error) {
            res.status(404).json({ message: `fail to reject approval` })
        }
    }
}

module.exports = Controller