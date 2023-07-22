const express = require("express");
const router = express.Router();
const cartCtrl = require("../../controllers/api/cartController");

router.post("/:userId/view", cartCtrl.viewCart);
router.post("/:userId/checkout", cartCtrl.checkout);
router.post("/:userId/add", cartCtrl.addToCart);
router.delete("/:userId/deleteOne", cartCtrl.deleteOneCartItem);

module.exports = router;
