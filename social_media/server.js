const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({
    extended: true
}));


app.use(express.static(path.join(__dirname, 'public')));

const dbDriver = "mongodb+srv://biswarup:Sp2ZtDfHdUE4LPCE@cluster0.ignsp.mongodb.net/socialmedia";


const router = require('./routes/image.route');
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