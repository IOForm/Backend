const { Form, Approval } = require('../models');

class FormController {
    static async getAllForm(req, res, next) {
        const getForm = await Form.findAll()
        res.status(200).json(getForm)     
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

    static async getFormById(req,res, next) {
        const getId = +req.params.id;
        const form = await Form.findByPk(getId) 
        res.status(200).json(form)
    }

    static async updateFormData(req,res, next) {
        try {
            const getId = +req.params.id
            // console.log(getId);
            const { clientName, formDetail, fileAttachment, approvalList, formComplete= false } = req.body
            const updateForm = { clientName, formDetail, fileAttachment, approvalList, formComplete }
            const update = await Form.update(updateForm, {
                where: {
                    id: getId
                },
                returning: true       
            })
            const generateApproval = []
            approvalList.forEach(item => generateApproval.push(Approval.update({
                UserId: item,
                FormId: update.id,
                approvalStatus: false,
                rejected: false
            }, {
                where: {id: +req.params.id}
            })))   
            await Promise.all(generateApproval)
                res.status(200).json({
                    id: update[1][0].id,
                    clientName: update[1][0].clientName,
                    formComplete: update[1][0].formDetail,
                    fileAttachment: update[1][0].fileAttachment,
                    approvalList: update[1][0].approvalList,
                    formComplete: update[1][0].formComplete,
                })       
        } catch (err) {
            console.log(err);
           next(err)
        }
    }

    static async deleteForm(req,res, next) {
        try {
            const getId = +req.params.id
            const user = await Form.destroy({
                where: {
                    id: getId
                }
            })
            if (!user) {
                throw {
                    name:'UserNotFound'
                }
            } else {
                res.status(200).json({message: 'form has been deleted'})
            } 
        } catch (err) {
            next(err)
        }
    }
}

module.exports = FormController