
const  express = require('express');
const app = express();
const bodyParsel=require('body-parser');
const mongoose =require('mongoose');
const cors=require('cors');
require('dotenv/config');


app.use(cors());
// app.options('*',cors())

app.use(bodyParsel.json());


app.listen(process.env.PORT,()=>{
    console.log(`server is running http://localhost:${process.env.PORT}
        `);
})