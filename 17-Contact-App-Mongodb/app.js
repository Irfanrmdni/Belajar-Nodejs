const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const { body, validationResult, check } = require('express-validator');
const methodOverride = require('method-override');

const app = express();
const port = 3000;
app.use(methodOverride('_method'));

//? koneksi ke database
require('./utils/db');
const Contact = require('./model/contact');


//? setup engine ejs
app.set('view engine', 'ejs');
app.use(expressLayouts);

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser('secret'));
app.use(session({
    secret: 'secret',
    cookie: { maxAge: 6000 },
    resave: true,
    saveUninitialized: true
}));
app.use(flash());

//? route dengan method GET. dengan halaman utama / root
app.get('/', (req, res) => {
    res.status(200);
    const mahasiswa = [
        {
            nama: 'galih wana',
            npm: '2113191069',
            jurusan: 'teknik informatika'
        },
        {
            nama: 'melina sari',
            npm: '2113191087',
            jurusan: 'teknik informatika'
        },
        {
            nama: 'anisa fitriani',
            npm: '2113191099',
            jurusan: 'teknik informatika'
        },
    ];

    res.render('index', {
        layout: 'layouts/mainLayout',
        name: 'azizah fitri',
        title: 'Home',
        data: mahasiswa
    });
});

//? route dengan method GET. dengan halaman about
app.get('/about', (req, res) => {
    res.status(200);
    res.render('about', {
        title: 'about',
        layout: 'layouts/mainLayout'
    });
});

//? route dengan method GET. dengan halaman contact
app.get('/contact', async (req, res) => {
    res.status(200);

    const contacts = await Contact.find();

    res.render('contact', {
        title: 'contact',
        layout: 'layouts/mainLayout',
        messageAddContact: req.flash('messageAddContact'),
        messageDeleteContact: req.flash('messageDeleteContact'),
        messageUpdateContact: req.flash('messageUpdateContact'),
        contacts
    });
});

//? route dengan method GET. untuk membuat tampilan tambah data contact
app.get('/contact/tambah', (req, res) => {
    res.status(200);

    res.render('tambah', {
        title: 'tambah data contact',
        layout: 'layouts/mainLayout',
    });
});

//? route dengan method POST. untuk logic menambah data contact
app.post('/tambahcontact', [
    body('nama').custom(async (value, { req }) => {
        const duplikat = await Contact.findOne({ nama: value });

        if (duplikat) {
            throw new Error('Nama kontak sudah tersedia! gunakan nama lain.');
        }

        return true;
    }),
    check('email', 'Email tidak valid!').isEmail(),
    check('nohp', 'Nomor HP tidak valid').isMobilePhone('id-ID')
], (req, res) => {
    res.status(200);
    const errors = validationResult(req);
    const getData = req.body;

    if (!errors.isEmpty()) {
        res.render('tambah', {
            title: 'tambah data contact',
            layout: 'layouts/mainLayout',
            errors: errors.array(),
        });
    } else {
        Contact.insertMany(getData, (error, result) => {
            req.flash('messageAddContact', 'Data contact Berhasil ditambahkan!');
            res.redirect('/contact');
        });
    }
});

//? route dengan method GET. untuk menangkap data contact yang akan dihapus berdasarkan id nya
// app.get('/contact/delete/:nama', async (req, res) => {
//     res.status(200);
//     const contact = await Contact.findOne({ nama: req.params.nama });

//     if (!contact) {
//         res.status(404);
//         res.send('<h1>Error 404</h1>');
//     } else {
//         Contact.deleteOne({ _id: contact._id }).then((error, result) => {
//             req.flash('messageDeleteContact', 'Data contact Berhasil di delete!');
//             res.redirect('/contact');
//         });
//     }
// });

//? route dengan method DELETE. untuk menangkap data contact yang akan dihapus berdasarkan nama
app.delete('/contact', (req, res) => {
    res.status(200);
    const getNama = req.body.nama;

    Contact.deleteOne({ nama: getNama }).then((error, result) => {
        req.flash('messageDeleteContact', 'Data contact Berhasil di delete!');
        res.redirect('/contact');
    });
});

//? route dengan method GET. untuk menampilkan update data contact
app.get('/contact/update/:nama', async (req, res) => {
    res.status(200);
    const contact = await Contact.findOne({ nama: req.params.nama });

    res.render('update-contact', {
        title: 'update data contact',
        layout: 'layouts/mainLayout',
        contact
    });
});

//? route dengan method POST. untuk logic update data contact
// app.post('/tambahcontact/update', [
//     body('nama').custom(async (value, { req }) => {
//         const duplikat = await Contact.findOne({ nama: value });

//         if (value !== req.body.oldNama.trim() && duplikat) {
//             throw new Error('Nama kontak sudah tersedia! gunakan nama lain.');
//         }

//         return true;
//     }),
//     check('email', 'Email tidak valid!').isEmail(),
//     check('nohp', 'Nomor HP tidak valid').isMobilePhone('id-ID')

// ], (req, res) => {
//     res.status(200);
//     const errors = validationResult(req);
//     const getData = req.body;

//     if (!errors.isEmpty()) {
//         res.render('update-contact', {
//             title: 'update data contact',
//             layout: 'layouts/mainLayout',
//             errors: errors.array(),
//             contact: getData
//         });
//     } else {
//         Contact.updateOne(getData, (error, result) => {
//             req.flash('messageUpdateContact', 'Data contact Berhasil diupdate!');
//             res.redirect('/contact');
//         });
//     }
// });

//? route dengan method PUT. untuk logic update data contact
app.put('/contact',
    [
        body('nama').custom(async (value, { req }) => {
            const duplikat = await Contact.findOne({ nama: value });

            if (value !== req.body.oldNama.trim() && duplikat) {
                throw new Error('Nama kontak sudah tersedia! gunakan nama lain.');
            }

            return true;
        }),
        check('email', 'Email tidak valid!').isEmail(),
        check('nohp', 'Nomor HP tidak valid').isMobilePhone('id-ID')

    ], (req, res) => {
        res.status(200);
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.render('update-contact', {
                title: 'update data contact',
                layout: 'layouts/mainLayout',
                errors: errors.array(),
                contact: req.body
            });
        } else {
            Contact.updateOne(
                { _id: req.body._id },
                {
                    $set: {
                        nama: req.body.nama,
                        nohp: req.body.nohp,
                        email: req.body.email,
                        alamat: req.body.alamat
                    }
                }
            ).then((error, result) => {
                req.flash('messageUpdateContact', 'Data contact Berhasil diupdate!');
                res.redirect('/contact');
            });
        }
    });

//? route dengan method GET. untuk mengambil detail nama contact
app.get('/contact/:nama', async (req, res) => {
    const contact = await Contact.findOne({
        nama: req.params.nama
    });

    res.status(200);
    res.render('detail', {
        title: 'detail',
        layout: 'layouts/mainLayout',
        contact
    });
});

app.listen(port, () => {
    console.log(`Mongodb contact app | Listening at http://localhost:${port}`);
});