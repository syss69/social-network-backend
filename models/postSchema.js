const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: String,
  media: String,
  likes: Array,
  comments: Array,
  age: Date,
});

const postModel = mongoose.model("Post", postSchema);

module.exports = postModel;
