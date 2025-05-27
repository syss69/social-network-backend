const express = require("express");
const checkUser = require("../middlewares/authMiddleware.js")
const messageController = require("../controllers/controllerMessage.js")

const router = express.Router();

router.post("/create", checkUser, messageController.createMessage);

module.exports = router;