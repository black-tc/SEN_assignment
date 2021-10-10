const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config/database');
const request = require("request");
const passport = require('passport');
const mongoose = require('mongoose');


try {
    //establish connection to the mongo database
    mongoose.connect(config.database, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
    .catch(error => console.log(error));
} catch (error) {
    console.log(error)
}

// check connection 
mongoose.connection.on('connected', () => {
    console.log('Successfully connected to the database! ☺');
});

//display connection errors
mongoose.connection.on('error', (err) => {
    console.log(`Connection failed, reason being, ${err}`);
});

//port variable
const port = 3000;
// initializing app with express
const app = express();

//use npm cors middleware
app.use(cors());

//set staic folder
app.use(express.static(path.join(__dirname, 'public')));

//body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//passport middle ware is very usefull so that some routes get proteced from being accessed if the user is not authenticated and so on
app.use(passport.initialize());

//using session 
app.use(passport.session());

//requiring the passport in the server 
require('./config/passport')(passport);

//declaring the users route
const users = require('./routes/users');


// error handler
try {
    app.use((err, req, res, next) => {
        if (err.name === 'ValidationError') {
            var valErrors = [];
            Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
            res.status(422).send(valErrors)
        }
    });
} catch (error) {
    console.log(error);
}

//users route
app.use('/users', users);

//index route
app.get('/', (req, res) => {
    res.send('invalid endpoint');
});


//start server
app.listen(port, () => {
    console.log(`SERVER STARTED ON PORT :: ${port}`);
});