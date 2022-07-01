const fs = require('fs');

// ? membuat folder data jika ada 
const dirPath = './data';
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
}

// ? membuat file contacts.json jika belum ada
const dataPath = './data/contacts.json';
if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, '[]', 'utf-8');
}

// ? untuk menangkap file contacts.json
const loadContact = () => {
    const file = fs.readFileSync('data/contacts.json', 'utf-8');
    const fileContacts = JSON.parse(file);

    return fileContacts;
}

// ? untuk menambahkan data contact
const addContact = (data) => {
    const getContact = {
        nama: data.nama,
        nohp: data.nohp,
        email: data.email,
        website: data.website,
    };
    const contact = loadContact();

    contact.push(getContact);

    fs.writeFileSync('./data/contacts.json', JSON.stringify(contact, null, 2));
}

// ? untuk menangkap nama dari contacts.json
const findNama = (nama) => {
    const fileContact = loadContact();
    const getNama = fileContact.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase());

    return getNama;
}

// ? untuk menghapus data contact
const deleteContact = (nama) => {
    const fileContact = loadContact();
    const deleteContact = fileContact.filter((contact) => {
        return contact.nama !== nama;
    });

    fs.writeFileSync('./data/contacts.json', JSON.stringify(deleteContact, null, 2));
}

// ? untuk update data contact
const updateContact = (contactUpdate) => {
    const contactLama = loadContact();

    //? hilangkan contact lama yang namanya itu sama dengan oldNama
    const filterContact = contactLama.filter((contact) => contact.nama !== contactUpdate.oldNama);

    //? karna kita mau push data contactUpdate maka kita hilangkan properti pada object contactUpdate yaitu oldNama. karna kita gak butuh oldNama
    delete contactUpdate.oldNama;
    filterContact.push(contactUpdate);
    fs.writeFileSync('./data/contacts.json', JSON.stringify(filterContact, null, 2));
}

// ? untuk validasi nama (duplikat)
const cekDuplikat = (nama) => {
    const fileContact = loadContact();
    const duplikat = fileContact.find((contact) => contact.nama === nama);

    return duplikat;
}

module.exports = {
    loadContact,
    addContact,
    findNama,
    deleteContact,
    cekDuplikat,
    updateContact
}