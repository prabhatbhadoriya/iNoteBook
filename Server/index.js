const express = require('express');
const app = express();
const connectToMongo = require('./db');
const router = express.Router();
var cors = require('cors')
const dotenv = require('dotenv');
app.use(cors())
dotenv.config({ path: './config.env' });

connectToMongo();
const port = process.env.PORT || 4000;
app.use(express.json());

app.use('/auth', require('./routes/auth'));
app.use('/notes', require('./routes/notes'));


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});