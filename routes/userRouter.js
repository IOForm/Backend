const userRouter = require('express').Router();
const Controller = require('../controllers/userController');

userRouter.get('/', Controller.show);
userRouter.post('/register', Controller.register);
userRouter.post('/login', Controller.login);

module.exports = userRouter