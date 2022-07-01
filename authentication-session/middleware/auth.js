const checkAuth = (req, res, next) => {
    if (!req.session || !req.session.user) {
        // const error = new Error('you need to login first');
        // error.statusCode = 401;
        // next(error);
        return res.redirect('/login');
    } else {
        next();
    }

};

module.exports = checkAuth;