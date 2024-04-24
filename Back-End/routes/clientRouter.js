const express = require('express');
const clientController = require('../controllers/clientController');
const verifyToken = require('../middlewares/verifyToken');
const allowedTo = require("../middlewares/allowedTo");
const router = express.Router();


router.route("/register")
    .post(clientController.register);

router.route("/login")
    .post(clientController.login);

router.route("/:ID")
    .patch(verifyToken, allowedTo('client'), clientController.update)
    .delete(verifyToken, allowedTo('client'), clientController.delete);

router.route("/")
    .get(verifyToken, allowedTo('client'), clientController.getAll)

module.exports = router;
