const express = require('express');
const verifyToken = require('../middlewares/verifyToken');
const allowedTo = require("../middlewares/allowedTo");
const productController = require('../controllers/productController');
const router = express.Router();



router.route('/getProduct/:productID')
    .get(verifyToken, allowedTo('client','seller'), productController.getProduct)

router.route('/getAllProducts/:category_name')
    .get(verifyToken, allowedTo('client'), productController.getAllProducts)

router.route('/getAllProductsHome')
    .get(verifyToken, allowedTo('client','seller'), productController.getAllProductsHome)

router.route('/getAllProductsSeller/:sellerID')
    .get(verifyToken, allowedTo('seller'), productController.getAllProductsSeller)

router.route('/addStock')
    .post(verifyToken, allowedTo('seller'), productController.addStock)

router.route('/addProduct')
    .post(verifyToken, allowedTo('seller'), productController.addProduct)

module.exports = router