const userService = require("../services/serviceUsers.js");

class userController{
    async createUser(req, res){
        try{
            const newUser = await userService.createUserService(req.body);
            if(newUser.status == false){
                return res.status(409).json(newUser)
            }
            res.status(201).json(newUser)
        }catch(err){
            res.status(500).json({status: false, message: err.message})
        }
    }
    async loginUser(req, res){
        try{
            const response = await userService.loginUserService(req.body);
            if(response.status == false){
                return res.status(404).json(user)
            }
            return res.status(200).cookie("token", response.token, {
                maxAge: 60 * 60 * 1000,
                httpOnly: true,
            })
            .json({ status: response.status, userId: response.userId })
        }catch(err){
            res.status(500).json({status: false, message: err.message})
        }
    }
    async getUser(req, res){
        try{
            const user = await userService.getUserService(req.params.id);
            if(user.status == false){
                return res.status(404).json(user)
            }
            res.json(user)
        }catch(err){
            res.status(500).json({status: false, message: err.message})
        }
    }

    async getUsersFriends(req, res){
        try{
            const friends = await userService.getUsersFriendsService(req.params.id);
            if(friends.status === false){
                return res.status(500).send(friends)
            }
            res.status(200).send(friends)
        }catch(err){
            res.status(500).json({status: false, message: err.message})
        }
    }

    async getMe(req, res){
        try{
            const me = await userService.getMeService(req.userId);
            res.json(me);
        }catch(err){
            res.status(500).json({status: false, message: err.message})
        }
    }
}

module.exports = new userController();
