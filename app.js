const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

mongoose.connect(config.database);

mongoose.connection.on('connected', ()=>{
    console.log('Connected to the database: ' + config.database);
});

mongoose.connection.on('error', (err)=>{
    console.log('Database error: ' + err);
});

mongoose.Promise = global.Promise;

const app = express();

const users = require('./routes/users');

const port = process.env.PORT || 8080;

//Middlewares
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

app.use('/users', users);

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.get('/', (req, res)=>{
    res.send('Invalid text');
});

app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(port, ()=>{
    console.log('Server listening to port: ' + port);
});