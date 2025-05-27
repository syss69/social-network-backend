const express = require("express");
const router = express.Router();
const postController = require("../controllers/controllerPosts.js")
const checkUser = require("../middlewares/authMiddleware.js")

router.get("/user/id/:id", postController.findPosts);
router.delete("/id/:id", postController.deletePost)
router.post("/create", checkUser, postController.createPost)
module.exports = router;
