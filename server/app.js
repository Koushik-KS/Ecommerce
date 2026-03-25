const express = require('express');
const app = express();
const bodyParsel = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');

app.use(cors());
//  app.options('*', cors());

app.use(bodyParsel.json());

// Import and use routes
const categoryRoutes = require('./routes/category');
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