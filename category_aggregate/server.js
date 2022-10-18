const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
// const path = require('path')
// const cookieParser = require('cookie-parser');
// const session = require('express-session')
// const flash = require('connect-flash')

app.set('view engine', 'ejs');
app.set('views', 'views')
// for reading body values
app.use(express.urlencoded({
    extended: true
}))
// app.use(session({
//     secret: 'M3S3CR3TK3Y',
//     resave: false,
//     saveUninitialized: false,
// }))

// app.use(cookieParser());
// app.use(flash());
// app.use(express.static(path.join(__dirname, 'public')));

const dbDriver = "mongodb+srv://biswarup:Sp2ZtDfHdUE4LPCE@cluster0.ignsp.mongodb.net/CategoryAggregation";

// const jwtAuth = require('./middleware/authjwt');
// app.use(jwtAuth.authjwt);


const router = require('./routes/category.route');
app.use(router);
const router1 = require('./routes/product.route');
app.use(router1);
const router2 = require('./routes/cart.route');
app.use(router2);

const port = process.env.PORT || 2000;
mongoose.connect(dbDriver, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(res => {
    app.listen(port, () => {
        console.log(`Server is connected @ http://localhost:${port}`);
    })
})