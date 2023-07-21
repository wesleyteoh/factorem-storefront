const express = require("express");
const router = express.Router();
const historyCtrl = require("../../controllers/api/historyController");

router.get("/:userId", historyCtrl.getHistory);
module.exports = router;
