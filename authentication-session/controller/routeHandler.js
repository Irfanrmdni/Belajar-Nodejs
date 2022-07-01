const userService = require('../service/userService');
const { validationResult } = require('express-validator');

const homePage = (req, res) => {
    res.status(200);
    res.render('pages/index', {
        layout: 'layouts/main',
        title: 'Home'
    });
};

const loginPage = (req, res) => {
    res.status(200);
    res.render('pages/login', {
        layout: 'layouts/main',
        title: 'Login'
    });
};

const registerPage = (req, res) => {
    res.status(200);
    res.render('pages/register', {
        layout: 'layouts/main',
        title: 'Register'
    });
};

const dashboardPage = (req, res) => {
    res.status(200);
    res.render('pages/dashboard', {
        layout: 'layouts/main',
        title: 'Dashboard',
    });
};

const registerHandler = async (req, res, next) => {
    res.status(200);
    const { username, email, password } = req.body;

    try {
        const error = validationResult(req);

        if (!error.isEmpty()) {
            error.status = 400;
            throw error;
        }

        const user = await userService.register(username, email, password);
        req.session.user = user;
        res.json({
            message: 'register successfully',
            data: {
                id: user.user_id
            }
        });
    } catch (error) {
        res.status(error.status).json(error);
    }
};

const loginHandler = async (req, res) => {
    res.status(200);
    const { email, password } = req.body;

    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            error.status = 400;
            throw error;
        }

        const user = await userService.login(email, password);

        req.session.user = user;
        res.json({
            message: 'login successfully',
            data: {
                id: user.user_id
            }
        });
    } catch (error) {
        res.status(error.status).json(error);
    }
};

const logoutHandler = (req, res, next) => {
    req.session.destroy((err) => {
        if (err) {
            next(err);
        }
        res.redirect('/');
        res.end();
    });
};

module.exports = {
    homePage,
    loginPage,
    registerPage,
    dashboardPage,
    registerHandler,
    loginHandler,
    logoutHandler,
}