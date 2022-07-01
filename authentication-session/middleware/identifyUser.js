const identifyUser = (req, res, next) => {
    if (!req.session || !req.session.user) {
        res.locals.user = null;
        next();
    } else {
        res.locals.user = req.session.user;
        next();
    }
};

module.exports = identifyUser;