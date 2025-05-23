const express = require("express");
const checkUser = require("../middlewares/authMiddleware.js")

const router = express.Router();
const userController = require("../controllers/controllerUsers.js")

router.post("/create", userController.createUser)
router.post("/login", userController.loginUser)
router.get("/id/:id",  userController.getUser);
router.get("/friends/:id", userController.getUsersFriends)
router.get("/me", checkUser, userController.getMe)

module.exports = router;
