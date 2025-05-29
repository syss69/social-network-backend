const express = require("express");
const conversationController = require("../controllers/controllerConversation.js");
const checkUser = require("../middlewares/authMiddleware.js")

const router = express.Router();

router.post("/create", conversationController.createConversation);
router.get("/:id", conversationController.getConversation);
router.get("/my/names", checkUser, conversationController.getMyConversationsNames)

module.exports = router;