const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://admin:Prbt5487@cluster0.tikzp.mongodb.net/inotebook?retryWrites=true&w=majority';



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
