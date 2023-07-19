const express = require("express");
const router = express.Router();
const userCtrl = require("../../controllers/api/usersController");
const ensureLoggedIn = require("../../config/ensureLoggedIn");

router.post("/register", userCtrl.create);
router.post("/login", userCtrl.login);
router.get("/check-token", ensureLoggedIn, userCtrl.checkToken);
router.get("/profile", userCtrl.getAccountDetails);
// router.get("/", userCtrl.getUsers);

module.exports = router;
