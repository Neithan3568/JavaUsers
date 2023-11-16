// db.js

const mongoose = require('mongoose');

async function connectDB() {
    try {
        const conn = await mongoose.connect('mongodb://127.0.0.1:27017/devcamp2687351', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Conectado a MongoDB'. bgCyan);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
}

module.exports = connectDB;