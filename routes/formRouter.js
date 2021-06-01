const formRouter = require('express').Router();
const FormController = require('../controllers/formController');

formRouter.get('/', FormController.getAllForm);
formRouter.post('/', FormController.addForm);
formRouter.get('/:id', FormController.getFormById);
formRouter.put('/:id', FormController.updateFormData);
formRouter.delete('/:id', FormController.deleteForm);




module.exports = formRouter