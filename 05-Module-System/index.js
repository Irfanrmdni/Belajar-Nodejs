//? mengimport core modules. untuk mengakses file system
const fs = require('fs');
//? mengimport local modules. tanda nya diawali dengan ./
const cetakNama = require('./coba');
//? mengimport third party modules. ini akan mencari di npm module dan akan berada di folder node_modules
const moment = require('moment');

console.log(cetakNama('irfan'));