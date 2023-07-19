const express = require("express");
const router = express.Router();
const userCtrl = require("../../controllers/api/usersController");

router.post("/register", userCtrl.create);
router.post("/login", userCtrl.login);
// router.get("/", userCtrl.getUsers);

module.exports = router;
