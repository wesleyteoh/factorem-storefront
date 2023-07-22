const express = require("express");
const router = express.Router();
const productCtrl = require("../../controllers/api/productsController");

router.get("/all", productCtrl.getAllProducts);
router.get("/one/:productId", productCtrl.getOneProduct);

module.exports = router;
