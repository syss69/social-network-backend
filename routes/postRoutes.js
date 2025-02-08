const express = require("express");
const router = express.Router();
const postController = require("../controllers/controllerPosts.js")

router.get("/:id", postController.findPosts);
router.delete("/:id", postController.deletePost)
router.post("/create", postController.createPost)
module.exports = router;
