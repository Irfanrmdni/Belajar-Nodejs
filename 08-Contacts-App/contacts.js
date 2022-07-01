const fs = require('fs');
const chalk = require('chalk');
const validator = require('validator');
// const readline = require('readline');

// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

//? membuat folder data jika belum ada
const dirPath = './data';
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
}

//? membuat file contacts.json jika belum ada
const filePath = './data/contacts.json';
if (!fs.existsSync(d = filePath)) {
    fs.writeFileSync(filePath, '[]', 'utf-8');
}

//? questions
// const questions = (question) => {
//     return new Promise((resolve) => {
//         rl.question(question, (answer) => {
//             resolve(answer);
//         });
//     });
// }

//? load contact
const loadContact = () => {
    const file = fs.readFileSync('data/contacts.json', 'utf8');
    const contacts = JSON.parse(file);

    return contacts;
}

//? save contacts
const saveContacts = (nama, nohp, email) => {
    const data = {
        nama,
        nohp,
        email
    };

    // const file = fs.readFileSync('data/contacts.json', 'utf8');
    // const contacts = JSON.parse(file);

    const contacts = loadContact();

    //* validasi nama
    const duplicate = contacts.find((contact) => contact.nama == nama);

    if (duplicate) {
        console.log(chalk.bgRed.white('nama sudah digunakan!. gunakan nama lain'));
        return false;
    }

    //* validasi nohp
    if (!validator.isMobilePhone(nohp, 'id-ID')) {
        console.log(chalk.bgRed.white('no handphone tidak valid!'));
        return false;
    }

    //* validasi email    
    if (!validator.isEmail(email)) {
        console.log(chalk.bgRed.white('email tidak valid!'));
        return false;
    }

    contacts.push(data);

    fs.writeFile('data/contacts.json', JSON.stringify(contacts, null, 2), (err) => {
        if (err) throw err;
        console.log(chalk.bgGreen.white('The file has been saved!'));
    });

    // rl.close();
}

//? list contact
const listContact = () => {
    const contacts = loadContact();
    console.log(chalk.bgBlue.white('--Daftar contacts--'))
    contacts.map((contact, index) => {
        const { nama } = contact;
        const { nohp } = contact;

        console.log(chalk.cyanBright` ${index + 1}. ${nama} - ${nohp}`);
    });
}

//? detail contact
const detailContact = (nama) => {
    const contacts = loadContact();
    const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase());

    if (!contact) {
        console.log(chalk.bgRed.white`${nama} tidak ditemukan!`);
        return false
    }

    console.log(chalk.bgGrey.white.bold`Nama: ${contact.nama} - No HP: ${contact.nohp} - Email: ${contact.email}`);
}

//? delete contact
const deleteContact = (nama) => {
    const contacts = loadContact();

    const newContacts = contacts.filter((contact) => {
        return contact.nama.toLowerCase() !== nama.toLowerCase();
    });

    if (contacts.length === newContacts.length) {
        console.log(chalk.bgRed.white`${nama} tidak ditemukan!`);
        return false
    }

    fs.writeFileSync('data/contacts.json', JSON.stringify(newContacts, null, 2));

    console.log(chalk.bgGreen.white.bold`${nama} berhasil dihapus!`);
}

module.exports = {
    // questions,
    saveContacts,
    listContact,
    detailContact,
    deleteContact
}