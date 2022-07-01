require('dotenv').config();
const express = require('express');
const router = require('./routes/route');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
require('./db/db');
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200
}));
app.use(router);

app.get('/', (req, res) => {
    res.status(200);
    res.send('hello express from home');
});

app.listen(port, () => {
    try {
        console.log(`Server running on port ${port}`);
    } catch (error) {
        console.log(error);
    }
});