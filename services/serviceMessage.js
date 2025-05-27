const messageRepository = require("../repositories/messageRepository.js");

class messageServices{
    async createMessageService(userId, data){
        try{
            return await messageRepository.createMessage(userId, data)
        }catch(err){
            console.error("error in service:", err.message);
            return {status: false, message: err.message}
        }
    }
}

module.exports = new messageServices ();