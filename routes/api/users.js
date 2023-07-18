const express = require("express");
const router = express.Router();
const userCtrl = require("../../controllers/api/usersController");

router.get("/users", userCtrl.getUsers);

module.exports = router;
