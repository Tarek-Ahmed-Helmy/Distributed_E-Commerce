const express = require('express')
const cors = require("cors");
const path = require("path");
const app = express();
const httpStatusCode = require("./utils/httpStatusText");
const { db_EGY, db_MAR } = require("./config/database");
require("dotenv").config();

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

// Routes
const clientRouter = require("./routes/clientRouter");
app.use("/clients", clientRouter);
const sellerRouter = require("./routes/sellerRouter");
app.use("/sellers", sellerRouter);
const orderRouter = require("./routes/orderRouter");
app.use("/orders", orderRouter);
const containRouter = require("./routes/containRouter");
app.use("/contain", containRouter);


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