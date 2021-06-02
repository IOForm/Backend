const { Form, Approval } = require('../models');
const sendMailToApproval = require('../helper/nodemailer')

class FormController {
    static getAllForm(req, res) {
        Form.findAll()
            .then(data => res.status(200).json(data))
            .catch(err => res.status(500).json(err))
    }

    static async addForm(req, res) {
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
        
        if(newForm && generateApproval) {
            sendMailToApproval('trisnaadetia@gmail.com', fileAttachment)
        }
        
        res.status(201).json({ message: 'Form and Approval Created' })
    }
}

module.exports = FormController