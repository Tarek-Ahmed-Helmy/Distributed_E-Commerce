const express = require('express');
const clientController = require('../controllers/clientController');
const verifyToken = require('../middlewares/verifyToken');
const allowedTo = require("../middlewares/allowedTo");
const containController = require('../controllers/containController');
const router = express.Router();



router.route('/addToCart')
    .post(containController.addProduct)



module.exports = router