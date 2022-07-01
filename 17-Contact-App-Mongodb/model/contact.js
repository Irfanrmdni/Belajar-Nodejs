const mongoose = require('mongoose');

//? membuat schema / model / collection dengan nama contact
const Contact = mongoose.model('Contact', {
    nama: {
        type: String,
        required: true,
    },
    nohp: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    alamat: {
        type: String,
        required: true,
    },
});

module.exports = Contact;