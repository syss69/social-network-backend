const userRepository = require("../repositories/userRepository.js");

class userServices {
    async createUserService (data){
        try{
            return await userRepository.createUser(data);
        }catch(err){
            console.error(err.message)
        }
    }

    async getUserService (data){
        try{
            return await userRepository.getUser(data);
        }catch(err){
            console.error("error in service:", err.message);
            return {status: false, message: err.message}
        }
    }

    async loginUserService (data){
        try{
            return await userRepository.loginUser(data);
        }catch(err){
            console.error(err.message);
        }
    }
}

module.exports = new userServices ();