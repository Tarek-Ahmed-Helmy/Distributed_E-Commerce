const express = require('express');
const verifyToken = require('../middlewares/verifyToken');
const allowedTo = require("../middlewares/allowedTo");
const containController = require('../controllers/containController');
const router = express.Router();



router.route('/addToCart')
    .post(verifyToken, allowedTo('client'), containController.addProduct)

router.route('/deleteFromCart')
    .delete(verifyToken, allowedTo('client'), containController.deleteProduct)

module.exports = router