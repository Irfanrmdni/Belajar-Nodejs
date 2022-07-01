const express = require('express');
const router = express.Router();
const controller = require('../controller/routeHandler');
const validator = require('../middleware/validator');
const auth = require('../middleware/auth');

// ? Halaman Home
router.get('/', controller.homePage);

// ? Halaman login
router.get('/login', controller.loginPage);

// ? Halaman register
router.get('/register', controller.registerPage);

// ? Halaman dashboard
router.get('/dashboard', auth, controller.dashboardPage);

// * logic register
router.post('/register', validator.register, controller.registerHandler);

// * Logic Login
router.post('/login', validator.login, controller.loginHandler);

// ? Logic Logout
router.get('/logout', controller.logoutHandler);

module.exports = router;