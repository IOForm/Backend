const approvalRouter = require('express').Router();
const Controller = require('../controllers/approvalController');

approvalRouter.get('/history', Controller.getApproveHistory);
approvalRouter.get('/client', Controller.getUserApproval);
approvalRouter.get('/:id', Controller.formApprovalDetail);
approvalRouter.patch('/:id', Controller.editStatus);
approvalRouter.delete('/:id', Controller.delete);
approvalRouter.patch('/reject/:id', Controller.rejectApproval);

module.exports = approvalRouter