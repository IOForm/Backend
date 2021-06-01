const roleRouter = require('express').Router();
const Controller = require('../controllers/roleController');

roleRouter.get('/', Controller.show);
roleRouter.post('/', Controller.create);
roleRouter.get('/:id', Controller.findOne);
roleRouter.patch('/:id', Controller.edit);
roleRouter.delete('/:id', Controller.delete);


module.exports = roleRouter