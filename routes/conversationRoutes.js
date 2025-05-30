const express = require("express");
const conversationController = require("../controllers/controllerConversation.js");
const checkUser = require("../middlewares/authMiddleware.js")
const checkAccesToChat = require("../middlewares/hasAccesToChat.js")

const router = express.Router();

router.post("/create", conversationController.createConversation);
router.get("/:id", checkUser, checkAccesToChat, conversationController.getConversation);
router.get("/my/names", checkUser, conversationController.getMyConversationsNames)

module.exports = router;