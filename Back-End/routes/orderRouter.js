const express = require('express');
const orderController = require('../controllers/orderController');
const verifyToken = require('../middlewares/verifyToken');
const allowedTo = require("../middlewares/allowedTo");
const router = express.Router();


router.route("/")
    .post(verifyToken, allowedTo('client'), orderController.checkout)
    .get(verifyToken, allowedTo('client'), orderController.getPurchased)

module.exports = router;
