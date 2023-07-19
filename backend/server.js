const express = require('express');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 5000
const colors = require('colors');
const { errorhandler}=require("./middlewares/errrorMiddleware");
const connectdb = require('../config/db');


connectdb();
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use('/api/goals' , require('./routes/goalroutes'));
app.use('/api/users' , require('./routes/userRoutes'));

app.use(errorhandler);


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
    });




