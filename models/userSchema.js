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
  password: { type: String, select: false, required: true },
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
