require('dotenv').config();
const express = require('express');
const cors =require('cors')

const cookieParser = require('cookie-parser')
const connectDB = require('./database/connect');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({extended:false}))

app.use('/', require('./routes/authRoutes'))


connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}...`);
    });
});
