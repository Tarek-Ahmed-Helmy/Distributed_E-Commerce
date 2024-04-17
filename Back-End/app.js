const express = require('express')
const cors = require("cors");
const app = express()
const httpStatusCode = require("./utils/httpStatusText");
app.use(express.json())
require("dotenv").config();

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