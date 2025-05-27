const express = require("express");
const conversationController = require("../controllers/controllerConversation.js")

const router = express.Router();

router.post("/create", conversationController.createConversation);
router.get("/:id", conversationController.getConversation);

module.exports = router;