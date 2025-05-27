const conversationService = require("../services/serviceConversation.js");

class conversationController{
    async createConversation(req, res){
        try{
            const newConversation = await conversationService.createConversation(req.body);
            res.status(201).json(newConversation)
        }catch(err){
            res.status(500).json({status: false, message: err.message});
        }
    }

    async getConversation(req, res){
        try{
            const conversation = await conversationService.getConversation(req.params.id);
            if(!conversation.status){
                return res.status(404).json(conversation)
            }
            return res.status(200).json(conversation)
        }catch(err){
            res.status(500).json({status: false, message: err.message});
        }
    }
}

module.exports = new conversationController();