const { body, check } = require('express-validator');
const Users = require('../model/users');

const login = [
    check('email', 'email wajib di isi!').notEmpty(),
    check('email', 'email tidak valid!').isEmail(),
    check('password', 'password wajib di isi!').notEmpty(),
    check('password', 'password minimal 6 karakter').isLength({ min: 6 }),
];

const register = [
    check('username', 'username wajib di isi!, ').notEmpty(),
    check('email', 'email tidak valid & tidak boleh kosong, ').isEmail().notEmpty(),
    body('email').custom(async (value, req) => {
        const cekEmail = await Users.findOne({ email: value });
        if (cekEmail) {
            return Promise.reject('email sudah tersedia');
        }

        return true;
    }),
    check('password', 'password minimal 6 karakter & tidak boleh kosong, ').isLength({ min: 6 }).notEmpty(),
];

const resetPassword = [
    check('password', 'password minimal 6 karakter').notEmpty().isLength({ min: 6 }),
];

module.exports = {
    login,
    register,
    resetPassword,
}