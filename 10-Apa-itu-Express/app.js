const express = require('express');
const app = express();
const port = 3000;

//? route dengan method GET. dengan halaman utama / root
app.get('/', (req, res) => {
    res.status(200);
    //* meresponse dalam bentuk text biasa
    // res.send('ini halaman root');
    //* meresponse dalam bentuk file html
    res.sendFile('file/index.html', { root: __dirname });
});

//? route dengan method GET. dengan halaman about
app.get('/about', (req, res) => {
    res.status(200);
    //* meresponse dalam bentuk json
    // res.json({
    //     message: 'ini halaman about'
    // });
    //* meresponse dalam bentuk file html
    res.sendFile('file/about.html', { root: __dirname });
});

//? route dengan method GET. dengan halaman contact
app.get('/contact', (req, res) => {
    res.status(200);
    //* meresponse dalam bentuk json
    // res.json({
    //     message: 'ini halaman contact'
    // });
    //* meresponse dalam bentuk file html
    res.sendFile('file/contact.html', { root: __dirname });
});

//? route dengan method GET. dengan mencoba untuk request params
app.get('/product/:id', (req, res) => {
    const { params } = req;

    res.status(200);
    res.send(`<h1>Product yang dipilih : ${params.id}</h1>`);
});

//? route dengan method GET. dengan mencoba untuk request params lebih dari 1
// app.get('/product/:id/category/:idCat', (req, res) => {
//     const { params } = req;

//     res.status(200);
//     res.send(`<h1>Product yang dipilih : ${params.id} Category : ${params.idCat}</h1>`);
// });

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
    //* meresponse dalam bentuk text biasa
    res.send('<h1>Error 404</h1>');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});