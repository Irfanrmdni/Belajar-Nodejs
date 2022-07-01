const fs = require('fs');
const readline = require('readline');

//* untuk membuat inputan contact json
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//* untuk membuat pertanyaan
rl.question('Masukan nama anda : ', (nama) => {
    rl.question('Masukan no HP : ', (nohp) => {
        //* untuk menyimpan data inputan nama dan nohp kedalam data
        const dataNama = nama.toString();
        const dataNohp = nohp.toString();
        const data = {
            Nama: dataNama,
            NoHP: dataNohp
        };
        //* untuk membaca file contacts.json dan ditampung ke variabel file
        const file = fs.readFileSync('contacts.json', 'utf8');
        //* untuk mengubah isi variabel file ke JSON
        const contacts = JSON.parse(file);
        //* untuk memasukan data inputan
        contacts.push(data);

        //* untuk menulis data kedalam contacts.json
        fs.writeFileSync('contacts.json', JSON.stringify(contacts));

        console.log('Contacts berhasil ditambahkan');

        rl.close();
    });
});

