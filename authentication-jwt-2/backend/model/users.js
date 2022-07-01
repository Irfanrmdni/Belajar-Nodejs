const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    resetPassword: {
        data: String,
        default: ''
    }
}, { timestamps: true });

const Users = mongoose.model('User', userSchema);

module.exports = Users;