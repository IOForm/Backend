const approvalRouter = require('express').Router();
const Controller = require('../controllers/approvalController');

approvalRouter.get('/', Controller.getUserApproval);
approvalRouter.get('/', Controller.getApproveHistory);
approvalRouter.post('/', Controller.create);
approvalRouter.patch('/:id', Controller.editStatus);
approvalRouter.delete('/:id', Controller.delete);


module.exports = approvalRouter