require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');
const session = require('./middleware/session');
const identifyUser = require('./middleware/identifyUser');

const app = express();
const port = 3000;

const userDao = require('./dao/user');
const routes = require('./routes/route');

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SESSION_NAME));
app.use(session);
app.use('*', identifyUser);
app.use(routes);


app.get('/session', (req, res) => {
    req.session.lastModified = new Date();
    res.end();
});

app.listen(port, async () => {
    try {
        await userDao.createUserTable();
        console.log(`server app listening on http://localhost:${port}`);
    } catch (err) {
        console.log(err);
    }
});