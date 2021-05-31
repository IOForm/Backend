const adminRouter = require('express').Router();
const AdminController = require('../controllers/adminController');

adminRouter.get('/dashboard', AdminController.dashboardData);
adminRouter.get('/staff', AdminController.staffData);

module.exports = adminRouter