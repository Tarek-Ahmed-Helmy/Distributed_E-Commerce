const express = require('express');
const orderController = require('../controllers/orderController');
const verifyToken = require('../middlewares/verifyToken');
const allowedTo = require("../middlewares/allowedTo");
const router = express.Router();


router.route("/")
    .post(verifyToken, allowedTo('client'), orderController.create)
    .get(verifyToken, allowedTo('client'), orderController.getAll)

router.route("/:ID")
    .get(verifyToken, allowedTo('client'), orderController.getOrder)

module.exports = router;
