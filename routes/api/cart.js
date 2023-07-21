const express = require("express");
const router = express.Router();
const cartCtrl = require("../../controllers/api/cartController");

router.post("/:userId", cartCtrl.addToCart);

module.exports = router;
