const messageService = require("../services/serviceMessage.js")

class messageController{
    async createMessage(req, res){
        try{
            const newMessage = await messageService.createMessageService(req.userId, req.body);
            if(newMessage.status == false){
                return res.status(409).json(newMessage)
            }
            res.status(201).json(newMessage)
        }catch(err){
            res.status(500).json({status: false, message: err.message})
        }
    }
}

module.exports = new messageController();