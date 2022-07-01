const db = require('../db/postgres');

const createUserTable = async () => {
    const sql = `
    CREATE TABLE IF NOT EXISTS users (
        user_id serial PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
    )`;
    try {
        await db.query(sql);
        console.log('user table berhasil dibuat');
        return Promise.resolve();
    } catch (error) {
        return Promise.reject(error);
    }
};

const insertOneUser = async (username, email, password) => {
    const text = `
    INSERT INTO users(username,email,password)
    VALUES ($1, $2, $3)
    RETURNING *
    `;

    const value = [username, email, password];

    try {
        const user = (await db.query(text, value)).rows[0];
        console.log('DAO insert table user successfully ', user);
        return user;
    } catch (error) {
        return Promise.reject(error);
    }
};

const findUserByEmail = async (email) => {
    const text = `SELECT * FROM users WHERE email = $1`;
    const value = [email];

    try {
        const user = (await db.query(text, value)).rows[0];
        return user;
    } catch (error) {
        return Promise.reject(error);
    }
}

module.exports = { createUserTable, insertOneUser, findUserByEmail };