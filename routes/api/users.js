const express = require("express");
const router = express.Router();
const userCtrl = require("../../controllers/api/usersController");
const ensureLoggedIn = require("../../config/ensureLoggedIn");

router.post("/register", userCtrl.create);
router.post("/login", userCtrl.login);
router.get("/check-token", ensureLoggedIn, userCtrl.checkToken);
router.post("/profile", userCtrl.getAccountDetails);
router.post("/profile/update", userCtrl.updateAccountDetails);
router.post("/profile/updatePass", userCtrl.updatePassword);
// router.get("/", userCtrl.getUsers);

module.exports = router;
