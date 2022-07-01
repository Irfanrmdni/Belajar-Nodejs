const express = require('express');
const app = express();

const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ? Middleware
const myLogger = (req, res, next) => {
    res.status(200);
    // * membuat middleware req sendiri dengan nama time
    req.time = new Date();
    next();
};

app.use(myLogger);

const users = [];

app.get('/', (req, res) => {
    res.status(200);

    console.log(req.time);

    res.json({
        message: 'Middleware',
        // * memanggil req time yang telah dibuat pada middleware
        time: req.time.toString()
    });
});

// ? Route Gorup
// * Alternatif lain kamu pun bisa membuat penanganan rute yg digabungkan menjadi satu jalur
// * dengan menggunakan sintaks app.route.
app.route('/user')
    .get((req, res) => {
        res.status(200);

        res.send(users);
    }).post((req, res) => {
        res.status(200);

        const user = req.body;
        users.push(user);

        res.json({
            message: 'login successfully',
            data: user
        })
    });

app.listen(port, () => {
    try {
        console.log(`Example app listening on port ${port}`)
    } catch (error) {
        console.log(error);
    }
});