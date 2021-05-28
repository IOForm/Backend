const router = require('express').Router();
const authentication = require('../middleware/authentication');
const userRouter = require('./userRouter');
const roleRouter = require('./roleRouter');

router.use(userRouter);
router.use(roleRouter);
router.use(authentication);

module.exports = router