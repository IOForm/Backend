const router = require('express').Router();
const authentication = require('../middleware/authentication');
const userRouter = require('./userRouter');
const roleRouter = require('./roleRouter');
const approvalRouter = require('./approvalRouter');

router.use('/', userRouter);
router.use('/role', roleRouter);
router.use(authentication);
router.use('/approval', approvalRouter);

module.exports = router