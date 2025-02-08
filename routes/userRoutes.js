const express = require("express");
const router = express.Router();
const userController = require("../controllers/controllerUsers.js")

router.post("/create", userController.createUser)
router.post("/login", userController.loginUser)
router.get("/:id", userController.getUser)

module.exports = router;
