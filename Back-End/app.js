const express = require('express')
const cors = require("cors");
const httpStatusCode = require("./utils/httpStatusText");
require("dotenv").config();
const { db1, db2 } = require("./config/database");

db1.authenticate()
    .then(()=>{
        console.log('connection established for db1')
    }).catch((err)=>{
        console.log('connection failed', err) 
    })
db2.authenticate()
    .then(()=>{
        console.log('connection established for db2')
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