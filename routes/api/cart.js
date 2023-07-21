const express = require("express");
const router = express.Router();
const cartCtrl = require("../../controllers/api/cartController");

router.post("/:userId", cartCtrl.viewCart);
router.post("/:userId/checkout", cartCtrl.checkout);

module.exports = router;
