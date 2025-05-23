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
}

module.exports = new conversationController();