const express = require("express");
const router = express.Router();
const shippingCtrl = require("../../controllers/api/shippingController");

router.get("/", shippingCtrl.shippingCategories);

module.exports = router;
