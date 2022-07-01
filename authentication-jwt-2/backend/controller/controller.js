const Users = require('../model/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const sendEmail = require('../helpers/index');

// ? login user
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await Users.findOne({
            $or: [
                { email: email },
                { username: email }]
        });

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(404).json({
                errors: errors.array()[0]
            });
        }

        if (!user) {
            return res.status(404).json({
                message: "username anda salah"
            });
        }

        const cekPassword = await bcrypt.compare(password, user.password);
        if (!cekPassword) {
            return res.status(404).json({
                message: "password anda salah"
            });
        }

        const data = {
            id: user._id,
        }

        const token = await jwt.sign(data, process.env.JWT_SECRET);
        res.status(200);
        res.json({
            status: res.statusCode,
            message: "Login user successfully",
            token,
        });
    } catch (error) {
        console.log(error);
    }
}

// ? register user
const register = async (req, res) => {
    const { username, email, password } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(404).json({
            errors: errors.array()
        });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const user = new Users({
        username,
        email,
        password: hashPassword
    });

    user.save();

    res.status(200);
    res.json({
        message: 'Register user successfully',
        user,
    });
}

// ? dashboard
const dashboard = async (req, res) => {
    res.status(200);

    const user = await Users.findOne({ _id: req.id })
    res.json({
        message: 'welcome to dashboard',
        id: user
    });
}

// ? forgot password
const forgotPassword = async (req, res) => {
    const { email } = req.body;
    const user = await Users.findOne({ email: email });

    if (!user) {
        return res.json({
            status: 'false',
            message: 'User tidak dapat ditemukan!',
        });
    }

    const payload = {
        id: user._id
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET);

    await Users.updateOne({
        resetPassword: token
    });

    const templateEmail = {
        from: "irfan ramdani",
        to: email,
        subject: "Link Reset Password",
        html: `<p>Silahkan klik link dibawah ini untuk reset password</p> <p>${process.env.CLIENT_URL}/resetpassword/${token}</p>`
    }

    sendEmail(templateEmail);

    res.json({
        status: 'true',
        message: 'Success, Silahkan cek email anda',
    });
}

// ? reset password
const resetPassword = async (req, res) => {
    const { token, password } = req.body;
    const user = await Users.findOne({ resetPassword: token });
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.json({
            errors: errors.array()[0]
        });
    }

    if (user) {
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hash(password, salt);
        user.password = hashPassword;

        await user.save();
        return res.status(200).json({
            message: 'reset password successfully',
        });
    }

}

module.exports = {
    login,
    register,
    dashboard,
    forgotPassword,
    resetPassword,
}