const conversationModel = require("../models/conversationSchema.js");

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
            const conversation = await conversationModel.findById(data);
            if (conversation) {
                return {status: true, conversation: conversation}
            }
            return {status: false, message: "Conversation not found!"}
        }catch(err){
            console.error(err.message);
            return { status: false, message: "Internal server error" };
        }
    }
}

module.exports = new repoConversation();