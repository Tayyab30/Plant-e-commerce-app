require('dotenv').config();
const express = require('express');
const passport = require ('passport');
const bodyParser = require('body-parser');
const morgan = require('morgan');


const app = express()
const PORT = process.env.PORT || 3000;

// keys from config/keys.js

const {mongoUri,cookieSecret} = require('./config/keys');
const mongoose  = require('mongoose');

// Database

mongoose
   .connect(mongoUri, {
       useNewUrlParser: true,
       useUnifiedTopology: true,
       useCreateIndex: true,
   })
   .then(()=> console.log("Database is connected"))
   .catch((err)=> console.log({err}));

// Middleware
app.use( bodyParser.urlencoded({ extended : true }));
app.use( bodyParser.json());
app.use(passport.initialize())
if( process.env.NODE_ENV.trim() === "development"){

    app.use(morgan('dev'));
}

// routes
app.get('/', ( req , res ) => { 
    res.send("working well")
})
app.use("/api/auth", require("./routes/auth"));

app.listen(PORT,()=>{console.log(`server is running at \nhttp://localhost:${PORT}`)})