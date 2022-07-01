const userDao = require('../dao/user');
const bcrypt = require('bcrypt');

const register = async (username, email, password) => {
    try {
        const saltRounds = 10;
        const hashPassword = await bcrypt.hash(password, saltRounds);
        const user = await userDao.insertOneUser(username, email, hashPassword);
        return user;
    } catch (error) {
        return Promise.reject(new Error('*Register gagal!'));
    }
};

const login = async (email, password) => {
    try {
        const user = await userDao.findUserByEmail(email);
        const userLogin = await bcrypt.compare(password, user.password);
        if (userLogin) {
            return user;
        }
        const error = new Error();
        error.status = 400;
        error.errors = [
            {
                param: 'password',
                msg: '*Password salah!'
            }
        ];
        throw error;
    } catch (error) {
        return Promise.reject(error);
    }
}

module.exports = {
    register,
    login,
};