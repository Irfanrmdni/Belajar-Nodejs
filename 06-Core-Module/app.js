//? core modules - file system
const fs = require('fs');
// console.log(fs);

//? core modules - readLine (sebuah modul untuk membaca apa yang kita tuliskan nanti di cmd)
const readline = require('readline');

//* untuk menulis string/text kedalam file secara Syncrhonous
// fs.writeFileSync('test.txt', 'hello world secara syncrhonous');

//* dengan menggunakan try catch supaya dapat menangkap error nya Syncrhonous
// try {
//     fs.writeFileSync('data/test.txt', 'hello world secara syncrhonous');
// } catch (err) {
//     console.log(err);
// }

//* untuk menulis string/text kedalam file secara Asyncrhonous
// fs.writeFile('data/test.txt', 'hello world secara Asyncrhonous', (err) => {
//     if (err) throw err;
//     console.log('The file has been saved!');
// });

//* untuk membaca file secara Syncrhonous. ini harus disimpan ke variabel dan gunakan encoding utf-8
// const readTest = fs.readFileSync('data/test.txt', 'utf-8');
// console.log(readTest);

// const readText = fs.readFile('data/test.txt', 'utf-8', (err, data) => {
//     if (err) throw err;
//     console.log(data);
// });

// console.log(readText);

//! untuk menghapus file
// fs.rmSync('test.txt');

const rl = readline.createInterface({
    //* proses apa yang dilakukan di cmd nya
    input: process.stdin,
    //* apa yang akan kita kirimkan nanti
    output: process.stdout
});

//* membuat pertanyaan di cmd
// rl.question('siapakah pemilik laptop ini : ', (jawab) => {
//     const nama = jawab === 'irfan' ? `Terimakasih nama ${jawab} cocok!` : 'Maaf nama tidak cocok!'
//     console.log(nama);

//     rl.close();
// });

//* membuat lebih dari 1 pertanyaan di cmd
rl.question('Nama Mahasiswa : ', (nama) => {
    rl.question('Npm Mahasiswa : ', (npm) => {
        const tanya = nama === 'irfan' && npm === '2113191069' ? `Terimakasih Nama ${nama}, dan Npm ${npm} anda cocok!` : `Maaf nama dan npm tidak cocok!`;
        console.log(tanya);

        rl.close();
    });
});