const express = require('express');
const app = express();
const bodyParser = require('body-parser'); // fix spelling
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');

app.use(cors());
app.use(bodyParser.json());

// routes (ONLY ONCE)
const categoryRoutes = require('./routes/categories');
app.use('/api/categories', categoryRoutes);

// Database
mongoose.connect(process.env.CONNECTION_STRING)
    .then(() => {
        console.log('Database connection ready...');

        app.listen(process.env.PORT, () => {
            console.log(`server is running http://localhost:${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });