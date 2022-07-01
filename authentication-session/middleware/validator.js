const { body, check } = require('express-validator');
const userDao = require('../dao/user');

const register = [
    body('email', '*Email tidak valid!').isEmail().exists().bail().notEmpty(),
    body('email').custom((value) => {
        return userDao.findUserByEmail(value).then((user) => {
            if (user) {
                return Promise.reject(new Error('email sudah terdaftar'));
            };
        });
    }),
    check('password', '*Password minimal 6 karakter!').isLength({ min: 6 }).exists().trim()
];

const login = [
    body('email', '*Email tidak valid!').isEmail().exists().bail().notEmpty(),
    body('email').custom((value) => {
        return userDao.findUserByEmail(value).then((user) => {
            if (typeof user === 'undefined') {
                return Promise.reject(new Error('*Email tidak terdaftar'));
            };
        });
    }),
    check('password', '*Password minimal 6 karakter!').isLength({ min: 6 }).exists().trim()
];

module.exports = {
    register,
    login
};