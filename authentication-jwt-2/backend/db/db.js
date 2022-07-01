const mongoose = require('mongoose');

try {
    mongoose.connect(process.env.MONGO_URL);
    console.log('database terhubung');
} catch (error) {
    console.log(error);
}