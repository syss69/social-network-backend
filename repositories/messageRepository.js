const messageModel = require("../models/messageSchema.js");

class repoMessage {
    constructor(){};
    async createMessage(userId, data){
        try{
            const message = new messageModel({
            author: userId,
            content: data.content,
            media: data.media,
            age: data.age
            })
            await message.save();
            return {status: true, message: "message created"}
        }catch(err){
            console.error(err.message);
            return { status: false, message: "Internal server error" };
        }
        
    }
}

module.exports = new repoMessage();