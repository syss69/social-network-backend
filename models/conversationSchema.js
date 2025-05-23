const mongoose = require("mongoose");
const {Schema } = mongoose;

const conversationSchema = new Schema({
    participants: {
        type: Array,
        ref: "User",
    },
    messages: {
        type: Array,
        ref: "Message"
    }
});

const conversationModel = mongoose.model("Conversation", conversationSchema);

module.exports = conversationModel;