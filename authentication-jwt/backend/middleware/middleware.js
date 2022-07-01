const jsonwebtoken = require('jsonwebtoken');

// * verifikasi token untuk proteksi resource
const verifyToken = (req, res, next) => {
    // * mengambil header authorization
    const authHeader = req.headers.authorization;

    // * jika user tidak mengirimkan token maka variabel token nya akan kosong. jika user mengirimkan token 
    // * maka kita akan split untuk mengambil token nya
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.sendStatus(401);
    }

    jsonwebtoken.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decode) => {
        if (err) {
            return res.sendStatus(403);
        }

        // * membuat variabel dengan nama email dari request yang nanti bisa digunakan
        // * dan decode email itu artinya karna kita menyertakan email di dalam token nya
        req.email = decode.email;
        next();
    });
};

module.exports = { verifyToken };