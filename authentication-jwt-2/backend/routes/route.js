const express = require('express');
const router = express.Router();
const controller = require('../controller/controller');
const validasi = require('../validator/validasi');
const middleware = require('../middleware/middleware');

router.post('/login', validasi.login, controller.login);
router.post('/register', validasi.register, controller.register);
router.get('/dashboard', middleware.requireToken, controller.dashboard);
router.put('/forgotPassword', controller.forgotPassword);
router.put('/resetPassword', validasi.resetPassword, controller.resetPassword);

module.exports = router;