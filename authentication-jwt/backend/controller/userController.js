const userModel = require('../model/userModel');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const Users = require('../model/userModel');

const getUsers = async (req, res) => {
    try {
        // * agar yang ditampilkan hanya id username email
        // * default nya id username email password refresh token
        const users = await userModel.findAll({
            attributes: ['id', 'username', 'email']
        });

        res.json({
            status: res.statusCode,
            message: 'Get users model successfully',
            data: users
        });
    } catch (error) {
        console.log(error);
    }
};

const register = async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;
    const saltRounds = 10;

    if (password !== confirmPassword) {
        return res.status(400).json({
            status: res.statusCode,
            message: 'password dan confirm password tidak valid'
        });
    }

    const hashPassword = await bcrypt.hash(password, saltRounds);

    try {
        const user = await userModel.create({
            username,
            email,
            password: hashPassword
        });

        res.json({
            status: res.statusCode,
            message: 'register user successfully',
            data: user
        });
    } catch (error) {
        console.log(error);
    }

};

const login = async (req, res) => {
    try {
        const user = await Users.findAll({
            where: {
                email: req.body.email
            }
        });

        const match = await bcrypt.compare(req.body.password, user[0].password);

        if (!match) {
            return res.status(400).json({
                status: res.statusCode,
                message: 'password anda salah'
            });
        }

        const userId = user[0].id;
        const username = user[0].username;
        const email = user[0].email;

        const accessToken = await jsonwebtoken.sign({ userId, username, email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '20s' });
        const refreshToken = await jsonwebtoken.sign({ userId, username, email }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1h' });
        await Users.update({ refresh_token: refreshToken }, { where: { id: userId } });

        // * membuat http only cookie yang akan dikirim ke client
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        });

        // * mengirimkan response ke client access token nya
        res.json({
            status: res.statusCode,
            message: 'login user successfuly',
            accessToken: accessToken
        });

    } catch (error) {
        res.status(400);
        res.json({
            status: res.statusCode,
            message: 'email tidak ditemukan'
        });
    }
};

const logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        return res.sendStatus(204);
    }

    const user = await Users.findAll({
        where: {
            refresh_token: refreshToken
        }
    });

    if (!user[0]) {
        return res.sendStatus(204);
    }

    const userId = user[0].id;

    await Users.update({ refresh_token: null }, {
        where: {
            id: userId
        }
    });

    res.clearCookie('refreshToken');
    return res.sendStatus(200);
}

module.exports = {
    getUsers,
    register,
    login,
    logout
}