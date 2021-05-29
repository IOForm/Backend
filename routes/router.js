const router = require('express').Router();
const authentication = require('../middleware/authentication');
const userRouter = require('./userRouter');
const roleRouter = require('./roleRouter');
const approvalRouter = require('./approvalRouter');

router.use(userRouter);
router.use(roleRouter);
router.use(authentication);
router.use(approvalRouter);

module.exports = router