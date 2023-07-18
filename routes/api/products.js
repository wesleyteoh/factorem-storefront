const express = require("express");
const router = express.Router();
const productCtrl = require("../../controllers/api/productsController");

router.get("/", productCtrl.getAllProducts);

module.exports = router;
