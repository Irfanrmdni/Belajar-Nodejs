// const cetakNama = require('./satu');
// const PI = require('./satu');
//? untuk mengimport nya kita harus 1 saja. dan usahakan nama yang akan diimport sama dengan nama filenya
//? dan ini akan menjadi object karna mengimport lebih dari 1 (function dan variabel)  
const satu = require('./satu');

// console.log(satu('irfan'), PI);

//? kita akan pecah supaya dapat menggunakan satu persatu
const { cetakNama } = satu;
const { PI } = satu;
const { mahasiswa } = satu;

console.log(cetakNama('irfan'), PI, mahasiswa.cetakMhs());