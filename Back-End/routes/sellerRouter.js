const express = require('express');
const sellerController = require('../controllers/sellerController');
const verifyToken = require('../middlewares/verifyToken');
const allowedTo = require("../middlewares/allowedTo");
const router = express.Router();


router.route("/register")
    .post(sellerController.register);

router.route("/login")
    .post(sellerController.login);

router.route("/:ID")
    .patch(verifyToken, allowedTo('seller'), sellerController.update)
    .delete(verifyToken, allowedTo('seller'), sellerController.delete);

router.route("/")
    .get(verifyToken, allowedTo('seller'), sellerController.getAll)

module.exports = router;
