// ? Synchronous 
// const getUserSync = (id) => {
//     let name = '';

//     id === 1 ? name = 'irfan' : name = 'ramdani';

//     return {
//         id: id,
//         name: name
//     }
// }

// const userSatu = getUserSync(1);
// console.log(userSatu);

// const userDua = getUserSync(2);
// console.log(userDua);

// const halo = 'hello world';
// console.log(halo);

// ? Asynchronous 
const getUser = (id, callback) => {
    const time = id === 1 ? '3000' : '2000';

    setTimeout(() => {
        let name = '';
        id === 1 ? name = 'irfan' : name = 'ramdani';

        callback({
            id: id,
            name: name
        });
    }, time);
}

const userSatu = getUser(1, (hasil) => {
    console.log(hasil);
});

const userDua = getUser(2, (hasil) => {
    console.log(hasil);
});

const halo = 'hello world';
console.log(halo);

