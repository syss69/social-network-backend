const express = require("express");
const router = express.Router();
const userModel = require("../models/userSchema.js");
const profileModel = require("../models/profileSchema.js");

router.get("/:id", (req, res) => {
  const user = userModel.findById(req.params.id);
  if (user) {
    res.status(200).json({ message: true });
  } else {
    res.status(404).json({ message: false });
  }
});
/*
router.get("/login", async (req, res) => {
  try {
    if (!req.body?.username || !req.body?.password) {
      return res.status(400).json({ status: false, message: "Missed data" });
    }
    const user = await userModel.findOne({
      username: req.body.username,
      password: req.body.password,
    });
    if (!user) {
      return res.status(404).json({
        status: false,
        message: "Username or password does not exist",
      });
    } else {
      return res.status(200).json({ status: true, message: "Authentificated" });
    }
  } catch (err) {
    res.status(500).json({ status: false, message: "Internal server error" });
    console.error(err.message);
  }
}); */

router.post("/login", async (req, res) => {
  try {
    if (!req.body?.username || !req.body?.password) {
      return res.status(400).json({ status: false, message: "Missed data" });
    }
    const user = await userModel.findOne({
      username: req.body.username,
      password: req.body.password,
    });
    if (!user) {
      return res.status(404).json({
        status: false,
        message: "Username or password does not exist",
      });
    } else {
      console.info("user found");
      res.status(200).send({ status: true, message: "Authentificated" });
      console.info("response sent");
    }
  } catch (err) {
    res.status(500).json({ status: false, message: "Internal server error" });
    console.error(err.message);
  }
});

router.post("/create", async (req, res) => {
  try {
    if (!req.body?.username || !req.body?.email || !req.body?.password) {
      return res
        .status(400)
        .json({ status: true, message: "Registration failed: missed data" });
    }
    const user = new userModel({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    try {
      await user.save();
      res
        .status(201)
        .json({ status: true, message: "User saved", userId: user._id });
    } catch (err) {
      if (err.message.slice(0, 26) === "E11000 duplicate key error") {
        res.status(409).json({
          status: false,
          message: "Username or email already exist",
          id: user._id,
        });
      }
    }
  } catch (err) {
    res.status(500).json({ status: false, message: "Internal server error" });
  }
});

module.exports = router;
