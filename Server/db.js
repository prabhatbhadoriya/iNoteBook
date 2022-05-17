const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const mongoURI = process.env.DATABASE;



const connectToMongo = () => {
    mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true
    })
        .then(() => console.log('MongoDB Connected...'))
        .catch(err => console.log(err));
}

module .exports = connectToMongo;
