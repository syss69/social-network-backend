const mongoose = require("mongoose");
const { Schema } = mongoose;

const profileSchema = new Schema({
  name: String,
  bio: String,
  friends: { type: Array, ref: "User" },
  serveurs: Array,
  posts: Array,
  userdata: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const profileModel = mongoose.model("Profile", profileSchema);

module.exports = profileModel;
