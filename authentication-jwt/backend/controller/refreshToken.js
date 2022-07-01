// * membuat refresh token agar setiap kali token nya expired. kita tidak perlu login lagi
// * sebelum itu kita harus menggunakan cookie-parser untuk parsir cookie dari refresh token nya

const Users = require('../model/userModel');
const jsonwebtoken = require('jsonwebtoken');

// ? fungsi untuk refresh token
const getRefreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.sendStatus(401);
        }

        const user = await Users.findAll({
            where: {
                refresh_token: refreshToken,
            }
        });
        if (!user[0]) {
            return res.sendStatus(403);
        }

        jsonwebtoken.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decode) => {
            if (err) {
                return res.sendStatus(403);
            }

            const userId = user[0].id;
            const username = user[0].username;
            const email = user[0].email;
            const accessToken = jsonwebtoken.sign({ userId, username, email }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '20s',
            });

            res.json({
                status: res.statusCode,
                accessToken: accessToken
            });
        });

    } catch (error) {
        console.log(error);
    }
}

module.exports = getRefreshToken;