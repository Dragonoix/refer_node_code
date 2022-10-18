const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
// const path = require('path')

// for reading body values
app.use(express.urlencoded({
    extended: true
}))


// app.use(express.static(path.join(__dirname, 'public')));

const dbDriver = "mongodb+srv://biswarup:Sp2ZtDfHdUE4LPCE@cluster0.ignsp.mongodb.net/CRUDAPI";


const router = require('./route/crudApi.route');
app.use('/api', router);

const port = process.env.PORT || 2000;
mongoose.connect(dbDriver, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(res => {
    app.listen(port, () => {
        console.log(`Server is connected @ http://localhost:${port}`);
    })
})