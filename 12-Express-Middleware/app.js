const express = require('express');
const morgan = require('morgan');
const expressLayouts = require('express-ejs-layouts');

const app = express();
const port = 3000;

//? menggunakan view engine ejs. untuk mengganti sendFile
app.set('view engine', 'ejs');

//? third party middleware
app.use(expressLayouts); //*Middleware untuk membuat layout dari ejs
app.use(morgan('dev')); // *Middleware logger permintaan HTTP untuk node.js

//? Built-in middleware agar bisa mengakses file statis
//* ketika membuat folder public maka dia akan otomatis menjadi folder root
app.use(express.static('public'));

//? application level middleware.
//* menjalankan middleware untuk semua path / request apapun
app.use((req, res, next) => {
    const waktu = Date.now();
    console.log('time ' + waktu);

    //* untuk menjalankan fungsi middleware berikutnya. ('/' , '/about' , '/contact')
    //! jika tidak menggunakan next() maka akan nge-hang
    next();
});

//* untuk middleware seperti '/' atau '/about' '/contact' itu tidak perlu pakai next(). karna akan error
//* karna nanti dia akan mengakses 2 header yang 1 nya dari header : 
//* app.use('/', (req, res) => {
//*     res.status(404);
//*     res.send('<h1>Error 404</h1>');
//* });

//? membuat middleware ke 2
app.use((req, res, next) => {
    console.log('ini adalah middleware ke-2');

    next();
});

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
    res.status(200);
    res.render('contact', {
        title: 'contact',
        layout: 'layouts/mainLayout'
    });
});

//? route dengan method GET. dengan mencoba untuk request params
app.get('/product/:id', (req, res) => {
    const { params } = req;

    res.status(200);
    res.send(`<h1>Product yang dipilih : ${params.id}</h1>`);
});

//? route dengan method GET. dengan mencoba untuk request params query
app.get('/mahasiswa/:nama', (req, res) => {
    const { params } = req;
    const { query } = req;

    console.log(params, query);

    res.status(200);
    res.send(`<h1>Nama Mahasiswa ${req.params.nama} NPM : ${req.query.npm}</h1>`);
});

//? route dengan menggunakan use.
//! ini akan selalu dijalankan untuk request apapun. jadi urutan eksekusi code nya harus sesuai.
app.use('/', (req, res) => {
    res.status(404);
    res.send('<h1>Error 404</h1>');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

//? route dengan method GET. dengan mencoba untuk request params lebih dari 1
// app.get('/product/:id/category/:idCat', (req, res) => {
//     const { params } = req;

//     res.status(200);
//     res.send(`<h1>Product yang dipilih : ${params.id} Category : ${params.idCat}</h1>`);
// });