const mongoose = require('mongoose');

//? connect ke database coba1
mongoose.connect('mongodb://127.0.0.1:27017/coba1', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

//? membuat schema database contact
// const Contact = mongoose.model('Contact', {
//     nama: {
//         type: String,
//         required: true,
//     },
//     nohp: {
//         type: String,
//         required: true,
//     },
//     email: {
//         type: String,
//         required: true,
//     },
//     alamat: {
//         type: String,
//         required: true,
//     },
// });

//? insert data kedalam collection contact
// const contact1 = new Contact({
//     nama: 'zihan syahfitri',
//     nohp: '089677452020',
//     email: 'zihansyahfitri99@gmail.com',
//     alamat: 'citambur'
// });

// //? menjalankan insert data
// contact1.save().then((contact) => console.log(contact));