const express = require("express");
const router = express.Router();
const cartCtrl = require("../../controllers/api/cartController");

router.post("/:userId", cartCtrl.addToCart);
router.post("/:userId/checkout", cartCtrl.checkout);

module.exports = router;
