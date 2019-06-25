const express = require('express');
const cors = require('cors');
const requireDir = require('require-dir');
const mongoose = require('mongoose');

const app = express();

//setup settings for server
app.use(require('body-parser').json());
app.use(cors());

//setup mongo database
mongoose.connect('mongodb://mongo:27017/login_data', {useNewUrlParser: true })
    .then(() => {
        console.log('##########################');
        console.log('Database Conected');
        console.log('##########################');
    })
    .catch(err => console.log(err));


//import all models
requireDir('./src/models');

//import routes
app.use('/api', require('./routes'));


app.listen(9000, () => {
    console.log('##########################');
    console.log('Listen Port 9000');
    console.log('##########################');
})