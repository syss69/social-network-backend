const conversationModel = require("../models/conversationSchema.js");
const userModel = require("../models/userSchema.js")

class repoConversation {
    constructor(){};
    async createConversation(data){
        try{
            const conversation = new conversationModel({
                participants: data.participants,
            });
            await conversation.save();
            return {status: true}
        }catch(err){
            console.error(err.message);
            return { status: false, message: "Internal server error" };
        }
    }

    async getConversation(data){
        try{
            const conversation = await conversationModel.findById(data).populate('messages');
            if (conversation) {
                return {status: true, conversation: conversation}
            }
            return {status: false, message: "Conversation not found!"}
        }catch(err){
            console.error(err.message);
            return { status: false, message: "Internal server error" };
        }
    }

    async getMyConversationsName(data){
        try {
            const user = await userModel.findById(data);
            const conversations = user.conversations;
            const names = [];

            for (const conversationId of conversations) {
            const chat = await conversationModel.findById(conversationId);

            if (!chat) continue;

            for (const participantId of chat.participants) {
                if (participantId != data) {
                const notMe = await userModel.findById(participantId);
                if (notMe) {
                    names.push({id: conversationId, name: notMe.name});
                }
                }
            }
            }

            return { status: true, names };
        } catch (err) {
            console.error(err.message);
            return { status: false, message: "Some conflicts in your request." };
        }
    }
}

module.exports = new repoConversation();