require('dotenv').config();
const jwt = require('jsonwebtoken');

const requireToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({
            status: res.statusCode,
            message: 'tidak ada token!'
        });
    }

    await jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
        if (err) {
            return res.sendStatus(401);
        }

        req.id = decode.id;
        next();
    });
}

module.exports = {
    requireToken
};