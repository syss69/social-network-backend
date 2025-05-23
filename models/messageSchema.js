const mongoose = require("mongoose");
const {Schema } = mongoose;

const messageSchema = new Schema({
    author: {
       type: mongoose.Schema.Types.ObjectId,
       ref: "User",
       required: true,
    },
    content: String,
    media: String,
    age: {type: Date, required: true},
})

const messageModel = mongoose.model("Message", messageSchema);

module.exports = messageModel;