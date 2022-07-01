const yargs = require("yargs");
const { saveContacts, listContact, detailContact, deleteContact } = require("./contacts");

yargs.command({
    command: 'add',
    describe: 'Add new contacts',
    builder: {
        nama: {
            describe: 'full name',
            demandOption: true,
            type: 'string',
        },
        nohp: {
            describe: 'no handphone',
            demandOption: true,
            type: 'string',
        },
        email: {
            describe: 'email',
            demandOption: true,
            type: 'string',
        }
    },
    handler: function (argv) {
        saveContacts(argv.nama, argv.nohp, argv.email);
    }
}).demandCommand();

//? menampilkan daftar semua nama dan no hp contact
yargs.command({
    command: 'list',
    describe: 'Menampilkan daftar semua nama dan no hp contact',
    handler: function () {
        listContact();
    }
});

//? menampilkan detail contact
yargs.command({
    command: 'detail',
    builder: {
        nama: {
            describe: 'full name',
            demandOption: true,
            type: 'string',
        }
    },
    describe: 'Menampilkan detail contact berdasarkan nama',
    handler: function (argv) {
        detailContact(argv.nama);
    }
});

//? menghapus detail contact
yargs.command({
    command: 'delete',
    builder: {
        nama: {
            describe: 'full name',
            demandOption: true,
            type: 'string',
        }
    },
    describe: 'Delete detail contact berdasarkan nama',
    handler: function (argv) {
        deleteContact(argv.nama);
    }
});

yargs.parse();

// const { questions, saveContacts } = require('./contacts');

// //? memasukan questions ke dalam contacts.json
// const main = async () => {
//     const nama = await questions('Masukan nama anda : ');
//     const nohp = await questions('Masukan no handphone anda : ');
//     const email = await questions('Masukan email anda : ');

//     saveContacts(nama, nohp, email);
// }

// main();

