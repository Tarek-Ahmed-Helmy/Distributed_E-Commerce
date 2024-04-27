const express = require('express');
const clientController = require('../controllers/clientController');
const verifyToken = require('../middlewares/verifyToken');
const allowedTo = require("../middlewares/allowedTo");
const productController = require('../controllers/productController');
const router = express.Router();



router.route('/getProduct/:productID')
    .get(productController.getProduct)

router.route('/getAllProducts/:category_name')
    .get(productController.getAllProducts)

router.route('/getAllProductsSeller/:sellerID')
    .get(productController.getAllProductsSeller)

router.route('/addStock')
    .post(productController.addStock)

router.route('/addProduct')
    .post(productController.addProduct)

module.exports = router