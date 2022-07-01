const session = require('express-session');
let redisStore = require('connect-redis')(session);
let redisClient = require('../db/redis');
// const { MemoryStore } = require('express-session');
// const redis = require('redis');
// const sessionStorage = new MemoryStore();

module.exports = session({
    name: process.env.SESSION_NAME,
    secret: process.env.SESSION_SECRET,
    store: new redisStore({ client: redisClient }),
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60,
        path: '/',
        secure: false,
    }
})