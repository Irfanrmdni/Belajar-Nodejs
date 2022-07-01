const cetakNama = (nama) => {
    return `hallo nama saya ${nama}`;
}

const PI = 3.14;

const mahasiswa = {
    nama: 'irfan',
    npm: 2113191069,
    cetakMhs: function () {
        return `hallo nama saya ${this.nama} npm ${this.npm}`
    }
}

//? cara untuk meng-eksports beberapa function/variabel/object sekaligus
// module.exports.cetakNama = cetakNama;
// module.exports.PI = PI;
// module.exports.mahasiswa = mahasiswa;

//? cara untuk meng-eksports hanya dengan 1x saja
module.exports = {
    cetakNama: cetakNama,
    PI: PI,
    mahasiswa: mahasiswa
} 