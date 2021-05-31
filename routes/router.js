const router = require('express').Router();
const authentication = require('../middleware/authentication');
const userRouter = require('./userRouter');
const roleRouter = require('./roleRouter');
const approvalRouter = require('./approvalRouter');
const formRouter = require('./formRouter');
const adminRouter = require('./adminRouter');

router.use(userRouter);
router.use('/role', roleRouter);
router.use(authentication);
router.use('/approval', approvalRouter);
router.use('/forms', formRouter)
router.use('/admin', adminRouter)

module.exports = router