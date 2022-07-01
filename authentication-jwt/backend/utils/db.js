const { Sequelize } = require('sequelize');

// ? koneksi ke database mysql
const db = new Sequelize('authjwt', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = db;