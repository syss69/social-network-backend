const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, unique: true, required: true },
  email: {
    type: String,
    unique: true,
    hidden: true,
    required: true,
  },
  password: { type: String, required: true },
  name: String,
  bio: String,
  avatar: String,
  friends: { type: Array, ref: "User" },
  servers: Array,
  posts: Array,
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
