const mongoose = require('mongoose');

const connectdb = async()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Mongodb connected: ${conn.connection.host}`.cyan.underline);

    }
    catch(error){
        console.log(error);
        process.exit(1);
    }
};

module.exports = connectdb;