const express = require('express')
const cors = require("cors");
const httpStatusCode = require("./utils/httpStatusText");
require("dotenv").config();
const { db_EGY, db_MAR } = require("./config/database");

db_EGY.authenticate()
    .then(()=>{
        console.log('connection established for EGYPT server');
    }).catch((err)=>{
        console.log('connection failed', err) 
    })
db_MAR.authenticate()
    .then(()=>{
        console.log('connection established for Morocco server');
    }).catch((err)=>{
        console.log('connection failed', err) 
    })


const app = express();
app.use(express.json());
const path = require('path')
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors()) //to handle the request comes from other ports

app.all("*", (req, res) => {
    return res.status(404).json({ status: httpStatusCode.ERROR, message: "this resource not found" })
})

//global error handler
app.use((error, req, res, next) => {
    res.status(error.statusCode||500).json({ status: error.statusText || httpStatusCode.FAIL, message: error.message });
})

app.listen(process.env.PORT, ()=>{
    console.log(`listening on ${process.env.PORT}`)
})