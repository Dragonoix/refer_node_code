const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');


app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({
    extended: true
}));

app.use(session({
    secret: 'MFHFH6764',
    resave: false,
    saveUninitialized: false
}));

app.use(cookieParser());
app.use(flash());

const dbDriver = "mongodb+srv://biswarup:Sp2ZtDfHdUE4LPCE@cluster0.ignsp.mongodb.net/business";

const jwtauth = require('./middleware/authjwt');
app.use(jwtauth.authjwt);

const router = require('./routes/app.route');
app.use(router);


const port = process.env.PORT || 3000;

mongoose.connect(dbDriver, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(res => {
    app.listen(port, () => {
        console.log(`My server is live at @ http://localhost:${port}`);
    })
})