const formRouter = require('express').Router();
const FormController = require('../controllers/formController');

formRouter.get('/', FormController.getAllForm);
formRouter.post('/', FormController.addForm);


module.exports = formRouter