// IMPORT EXPRESS FUNCTION TO SET UP THE SERVER 

const express = require('express');
const app = express();

// DOTENV IS USED TO CALLBACK THE .ENV FILE FOR USING OUR PORT TO MAKE SERVEER LIVE 
require('dotenv').config();

// TO MAKE OUR PUBLIC FOLDER AS STATIC WE USE PATH.JOIN FUNCTION 
const path = require('path');

// VIEW ENGINE IS USED TO BRING THE EJS FUNCTION AND VIEWS VIEWS MEANS, TO SEE AND GET OUR VIEWS FOLDER FILES 
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static(path.join(__dirname, 'public')));

// TO CALL THE APPROUTER PAGE AS FUNCTION TO SEE THE OUTPUT IN THE WEB SERVER 
const appRouter = require('./routes /app.routes');
app.use(appRouter);

// TO IMPORT THE PORT 
const port = process.env.PORT || 2000;

// TO LISTEN OUR PORT FOR MAKING OUR SERVER LIVE 
  
app.listen(port, () =>{
    console.log(`Server is connected @ http://localhost:${port}`);
})








