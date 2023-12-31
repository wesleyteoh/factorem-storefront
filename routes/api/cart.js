const express = require("express");
const router = express.Router();
const cartCtrl = require("../../controllers/api/cartController");
const ensureLoggedIn = require("../../config/ensureLoggedIn");

router.post("/:userId/view", ensureLoggedIn, cartCtrl.viewCart);
router.put("/:userId/update", ensureLoggedIn, cartCtrl.updateQty);
router.post("/:userId/checkout", cartCtrl.checkout);
router.post("/:userId/add", cartCtrl.addToCart);
router.delete("/:userId/deleteOne", cartCtrl.deleteOneCartItem);

module.exports = router;
