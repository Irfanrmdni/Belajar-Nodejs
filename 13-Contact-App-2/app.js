const express = require('express');
const morgan = require('morgan');
const expressLayouts = require('express-ejs-layouts');

//? express-session , connect-flash dan cookie-parser dependency untuk membuat pesan alert ketika data berhasil dibuat / dihapus / diedit
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');

//? express-validator dependency untuk middleware validasi
const { body, validationResult, check } = require('express-validator');

const { loadContact, addContact, findNama, deleteContact, cekDuplikat, updateContact } = require('./utils/contacts');

const app = express();
const port = 3000;

//? menggunakan view engine ejs. untuk mengganti sendFile
app.set('view engine', 'ejs');

//? third party middleware
app.use(expressLayouts);
app.use(morgan('dev'));

//? Built-in middleware agar bisa mengakses file statis
app.use(express.static('public'));
//? Built-in middleware untuk parsing request body dari data yang masuk
app.use(express.urlencoded({ extended: true }));

//? konfigurasi middleware flash untuk membuat pesan alert nya
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
app.get('/contact', (req, res) => {
    const contacts = loadContact();

    res.status(200);
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
    body('nama').custom((value, { req }) => {
        const duplikat = cekDuplikat(value);
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
        addContact(getData);
        req.flash('messageAddContact', 'Data contact Berhasil ditambahkan!');
        res.redirect('/contact');
    }
});

//? route dengan method GET. untuk menangkap data contact yang akan dihapus
app.get('/contact/delete/:nama', (req, res) => {
    res.status(200);
    const contact = findNama(req.params.nama);

    if (!contact) {
        res.status(404);
        res.send('<h1>Error 404</h1>');
    } else {
        deleteContact(req.params.nama);
        req.flash('messageDeleteContact', 'Data contact Berhasil di delete!');
        res.redirect('/contact');
    }
});

//? route dengan method GET. untuk menampilkan update data contact
app.get('/contact/update/:nama', (req, res) => {
    res.status(200);
    const contact = findNama(req.params.nama);

    res.render('update-contact', {
        title: 'update data contact',
        layout: 'layouts/mainLayout',
        contact
    });
});

//? route dengan method POST. untuk logic update data contact
app.post('/tambahcontact/update', [
    body('nama').custom((value, { req }) => {
        const duplikat = cekDuplikat(value);
        //? value (nama baru yang di input atau ubah)
        //? oldNama (nama lama yang ada di contacts.json)
        //? duplikat (nama yang telah di edit sama dengan nama yang ada di contacts.json)

        //? jadi fungsi ini melakukan 2x pengecekan
        //? jadi ketika user input nama yang tidak sama dengan nama lama (oldNama) dan nama yang user input itu
        //? sama dengan nama yang ada di data contacts.json maka akan error. 
        //? jika nama yang di input user itu sama dengan nama lama (oldNama) maka akan lolos
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
    const getData = req.body;

    if (!errors.isEmpty()) {
        res.render('update-contact', {
            title: 'update data contact',
            layout: 'layouts/mainLayout',
            errors: errors.array(),
            contact: getData
        });
    } else {
        updateContact(getData);
        req.flash('messageUpdateContact', 'Data contact Berhasil diupdate!');
        res.redirect('/contact');
    }
});

//? route dengan method GET. untuk mengambil detail nama contact
app.get('/contact/:nama', (req, res) => {
    const contact = findNama(req.params.nama);

    res.status(200);
    res.render('detail', {
        title: 'detail',
        layout: 'layouts/mainLayout',
        contact
    });
});

//? route dengan method GET. dengan mencoba untuk request params query
app.get('/mahasiswa/:nama', (req, res) => {
    const { params } = req;
    const { query } = req;

    console.log(params, query);

    res.status(200);
    res.send(`<h1>Nama Mahasiswa ${req.params.nama} NPM : ${req.query.npm}</h1>`);
});

//? untuk menangkap query selain dari diatas (error)
app.use('/', (req, res) => {
    res.status(404);
    res.send('<h1>Error 404</h1>');
});



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
