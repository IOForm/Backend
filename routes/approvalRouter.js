const approvalRouter = require('express').Router();
const Controller = require('../controllers/approvalController');

approvalRouter.get('/user', Controller.getUserApproval);
approvalRouter.get('/', Controller.getApproveHistory);
approvalRouter.get('/:id', Controller.formApprovalDetail);
approvalRouter.post('/', Controller.create);
approvalRouter.patch('/:id', Controller.editStatus);
approvalRouter.delete('/:id', Controller.delete);
approvalRouter.patch('/reject/:id', Controller.rejectApproval);


module.exports = approvalRouter