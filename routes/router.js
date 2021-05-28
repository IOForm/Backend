const router = require('express').Router();
const authentication = require('../middleware/authentication');
const userRouter = require('./userRouter');

router.use(userRouter);
router.use(authentication);

module.exports = router