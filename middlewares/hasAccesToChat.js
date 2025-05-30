const conversationModel = require("../models/conversationSchema.js");

const checkAccesToChat = async (req, res, next) => {
    try{
        const userId = req.userId;
        const chat = await conversationModel.findById(req.params.id);
        if (!chat || !chat.participants.includes(userId)){
            return res.status(403).json({ message: 'Access denied' });
        }
        next()
    }catch(err){
        console.error(err.message);
        res.status(500).send("Iternal server error");
    }
}

module.exports = checkAccesToChat;