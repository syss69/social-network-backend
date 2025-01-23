const express = require("express");
const router = express.Router();
const postModel = require("../models/postSchema.js");

router.get("/:id", (req, res) => {});

router.post("/create", async (req, res) => {
  try {
    if (!req.body?.author) {
      return res.status(400).json({ status: false, message: "Missed author" });
    }
    if (!req.body?.content && !req.body.media) {
      return res.status(400).json({
        status: false,
        message: "Impossible create a post without text or media file",
      });
    }
    const newPost = new postModel({
      author: req.body.author,
      content: req.body?.content,
      media: req.body?.media,
      age: req.body.age,
    });
    await newPost.save();
    res.status(201).json({ status: true, message: "Post saved" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ status: false, message: err.message });
  }
});

module.exports = router;
