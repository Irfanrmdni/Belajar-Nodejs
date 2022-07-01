const { MongoClient, ObjectId } = require('mongodb');

//? konfigurasi untuk connect ke database
const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const dbname = 'coba1';

//? menjalankan database
client.connect((error, client) => {
    if (error) {
        return console.log('koneksi anda error');
    }

    //* pilih database 
    const db = client.db(dbname);

    //* insert 1 data di collection mahasiswa
    // db.collection('mahasiswa').insertOne({
    //     nama: 'aldi taher',
    //     email: 'aldi@gmail.com'
    // }, (error, result) => {
    //     if (error) {
    //         return console.log('gagal menambahkan data mahasiswa!');
    //     }

    //     console.log(result);
    // });

    //* insert banyak data di collection mahasiswa
    // db.collection('mahasiswa').insertMany([
    //     {
    //         nama: 'jihan saedah',
    //         email: 'jihansaedah12@gmail.com',
    //     },
    //     {
    //         nama: 'aldi taher',
    //         email: 'alditaher1112@gmail.com',
    //     },
    //     {
    //         nama: 'yani suherti',
    //         email: 'yanisuherti88@gmail.com',
    //     },
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('gagal menambahkan data mahasiswa!');
    //     }

    //     console.log(result);
    // });

    //* menampilkan semua data yang ada pada collection mahasiswa
    // const showdb = db.collection('mahasiswa').find().toArray((error, result) => console.log(result));

    //* menampilkan data berdasarkan id yang ada pada collection mahasiswa
    // const showdb = db.collection('mahasiswa').find({ _id: ObjectId('62316aab36724a8d6fd28422') }).toArray((error, result) => console.log(result));
    // console.log(showdb);

    //* mengupdate data berdasarkan id yang ada pada collection mahasiswa
    // const updateMahasiswa = db.collection('mahasiswa').updateOne({
    //     _id: ObjectId('6231909c02ad5bfc201f718e')
    // }, {
    //     $set: {
    //         nama: 'jihan syahfitri nur'
    //     },
    // });

    // updateMahasiswa.then((result) => {
    //     console.log(result);
    // }).catch((error) => {
    //     console.log(error);
    // });

    //* mengupdate banyak data berdasarkan nama yang ada pada collection mahasiswa
    // db.collection('mahasiswa').updateMany({
    //     nama: 'irfan ramdani'
    // }, {
    //     $set: {
    //         nama: 'ramdani ajah'
    //     }
    // });

    //* delete data berdasarkan id yang ada pada collection mahasiswa
    // const deleteMahasiswa = db.collection('mahasiswa').deleteOne({
    //     _id: ObjectId('6231a6349f9bc4d82acac6a5')
    // });

    // deleteMahasiswa.then((result) => {
    //     console.log(result);
    // }).catch((error) => {
    //     console.log(error);
    // });

    //* delete banyak data berdasarkan id yang ada pada collection mahasiswa
    const deleteMahasiswa = db.collection('mahasiswa').deleteMany({
        nama: 'aldi taher'
    });

    deleteMahasiswa.then((result) => {
        console.log(result);
    }).catch((error) => {
        console.log(error);
    });

    return console.log('koneksi anda berhasil');
});