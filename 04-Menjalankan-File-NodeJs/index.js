// let nama = 'azizah';

// const sayHello = (nama) => `halo. nama saya ${nama}`;

// console.log(sayHello(nama));
// ? memanggil file lain untuk menjalankan. maka yang terjadi ketika dijalankan di node file dari coba.js akan dijalankan
// ? sekaligus dengan file index.js jadi menjalankan 2 file javascript sekaligus
// require('./coba');

// ? mengimpot file javascript diluar file dan kita akan menjalankan nya (kita harus simpan kedalam variabel)
const cetakNama = require('./coba');
console.log(cetakNama('irfan'));

console.log('hello world');