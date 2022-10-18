const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({
    extended: true
}));

app.use(session({
    secret: 'DR67A43GO',
    resave: false,
    saveUninitialized: false,   // alaways both are false 
    // cookie: { secure: true } no need
}));

app.use(flash());

const dbDriver = "mongodb+srv://biswarup:Sp2ZtDfHdUE4LPCE@cluster0.ignsp.mongodb.net/EmpFile";


const router = require('./route/app.route');
app.use(router);

const port = process.env.PORT || 3000;


mongoose.connect(dbDriver, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(res => {
    app.listen(port, () => {
        console.log('DB is connected');
        console.log(`Server is connected @ http://localhost:${port}`);
    })
})