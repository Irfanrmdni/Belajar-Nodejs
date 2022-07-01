const { DataTypes } = require('sequelize');
const db = require('../utils/db');

// ? membuat model atau table database
const Users = db.define('users', {
    username: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    refresh_token: {
        type: DataTypes.TEXT
    }

}, {
    freezeTableName: true,
    timestamps: true,
});

module.exports = Users;