//? Dependencies validator (untuk validasi)
const validator = require('validator');

//? Dependencies chalk @4.0.1 (untuk mengubah style cmd)
const chalk = require('chalk');

//? Dependencies nodemon (untuk memonitor perubahan script pada program kita. jadi kita tidak perlu bulak balik ke cmd untuk menjalankan program)

//* cara menggunakan nodemon cukup ketik $nodemon <nama file project>

//* validasi email
// const email = validator.isEmail('irfanrmdni209@gmail.com');

//* validasi mobile phone (dengan tambahan opsi negara indonesia)
// const phone = validator.isMobilePhone('089677451818', 'id-ID');

//* validasi numeric (apakah string ini serangkaian angka atau bukan)
// const numeric = validator.isNumeric('089677451818');

//* chalk untuk mengubah warna text
// console.log((chalk.blue('Hello') + ' World' + chalk.red('!')));

//* chalk untuk mengubah warna text dan background
// console.log(chalk.bgCyan.black('hello world!'));

//* chalk untuk sweet alert
// const error = chalk.bold.red;
// const warning = chalk.hex('#FFA500');

// console.log(error('Error!'));
// console.log(warning('Warning!'));

//* chalk untuk modifiers
// console.log(chalk.bold('hello world!'));

//* chalk untuk mengubah style yang diinginkan saja dengan tagged template
const pesan = chalk`Lorem {bold.bgGreen.white ipsum dolor} irfan ramdani sit, amet {bold.bgBlue.white consectetur} adipisicing elit. {bgRed.white Autem}, enim?`;
console.log(pesan);
