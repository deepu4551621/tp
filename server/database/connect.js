const mongoose = require("mongoose");
require('dotenv').config();

const connectDB = async () => {
    try {
        const db = process.env.DATABASE;
        await mongoose.connect(db);
        console.log('Connected to database');
    } catch (error) {
        console.error('Error connecting to database:', error.message);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;
