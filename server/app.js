const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

app.use(cors());
app.options('*', cors());

app.use(express.json());

// routes
const categoryRoutes = require('./routes/categories');
const productRoutes = require('./routes/product');


app.use('/api/category', categoryRoutes);
app.use('/api/products', productRoutes);


// Database (FIXED)
mongoose.connect(process.env.CONNECTION_STRING)
  .then(() => {
    console.log('Database connection ready...');

    app.listen(process.env.PORT || 4000, () => {
      console.log(`server is running http://localhost:${process.env.PORT || 4000}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });