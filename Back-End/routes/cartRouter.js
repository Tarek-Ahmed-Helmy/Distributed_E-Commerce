const express = require('express');
const cartController = require('../controllers/cartController');
const verifyToken = require('../middlewares/verifyToken');
const allowedTo = require("../middlewares/allowedTo");
const router = express.Router();


router.route('/getAllProducts')
    .get(verifyToken, allowedTo('client'),cartController.getAllProducts)



module.exports = router