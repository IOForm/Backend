const { Form, Approval } = require('../models');

class FormController {
    static getAllForm(req, res, next) {
        Form.findAll()
        .then(data => res.status(200).json(data))
        .catch(err => next(err))
    }

    static async addForm(req, res, next) {
        try {
            const { clientName, formDetail, fileAttachment, approvalList } = req.body
            const newForm = await Form.create({
                clientName,
                formDetail,
                fileAttachment,
                formComplete: false,
            })
            const generateApproval = []
            approvalList.forEach(item => generateApproval.push(Approval.create({
                UserId: item,
                FormId: newForm.id,
                approvalStatus: false,
                rejected: false
            })))
            
            await Promise.all(generateApproval)
            res.status(201).json({ message: 'Form and Approval Created' })
        } catch (err) {
            console.log(err);
            next(err)
        }
    }
}

module.exports = FormController