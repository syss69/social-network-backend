const express = require("express");
const router = express.Router();
const userModel = require("../models/userSchema.js");
const profileModel = require("../models/profileSchema.js");

router.post("/create", async (req, res) => {
  try {
    if (!req.body?.name) {
      return res
        .status(400)
        .json({ status: false, message: "Registration failed: missed data" });
    }
    const profile = new profileModel({
      name: req.body.name,
      userdata: req.body.userdata,
    });
    await profile.save();
    console.log("profile saved");
    res.status(201).json({ status: true, message: "User saved" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
});

router.patch("/change/bio", async (req, res) => {
  try {
    const profile = await profileModel.findOneAndUpdate(
      { userdata: req.body.userdata },
      { $set: { bio: req.body.bio } },
      { new: true }
    );
    if (profile) {
      res.status(200).json({ status: true, message: "Bio changed" });
    } else {
      res.status
        .apply(404)
        .json({ status: false, message: "Profile not found" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
});

router.get("/:id", async(req, res) => {
  try{const profile = await profileModel.findOne({userdata: req.params.id});
  if(profile){
    res.status(200).send(profile);
  }else{
    res.status(404).json({ message: false })
  }}catch(err){
    console.error(err.message)
  }
})

module.exports = router;
