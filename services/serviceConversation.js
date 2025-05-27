const conversationRepository = require("../repositories/conversationRepository.js");

class conversationService{
    async createConversation (data){
        try{
            return await conversationRepository.createConversation(data)
        }catch(err){
            console.error("error in create conversation service:", err.message);
            return {status: false, message: err.message}
        }
    }

    async getConversation (data){
        try{
            return await conversationRepository.getConversation(data);
        }catch(err){
            console.error("error in get conversation service:", err.message);
            return {status: false, message: err.message}
        }
    }
}

module.exports = new conversationService ();