const express = require("express");
const router = express.Router();
const ensureLoggedIn = require("../../config/ensureLoggedIn");
const adminCtrl = require("../../controllers/api/adminController");

router.post("/view", adminCtrl.viewAllOrders);
router.get("/all", adminCtrl.getAdminAllProducts);
router.put("/updateShipping", adminCtrl.updateShipping);

module.exports = router;
