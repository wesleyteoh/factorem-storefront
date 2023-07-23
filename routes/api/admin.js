const express = require("express");
const router = express.Router();
const ensureLoggedIn = require("../../config/ensureLoggedIn");
const adminCtrl = require("../../controllers/api/adminController");

router.post("/view", adminCtrl.viewAllOrders);

module.exports = router;