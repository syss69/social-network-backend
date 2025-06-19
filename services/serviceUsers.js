const userRepository = require("../repositories/userRepository.js");
const argon2 = require("argon2")
const jwt = require("jsonwebtoken")
require("dotenv").config();

class userServices {
    async createUserService (data){
        try{
            data.password = await argon2.hash(data.password);
            return await userRepository.createUser(data);
        }catch(err){
            console.error(err.message)
        }
    }

  async getUserService(data) {
    try {
      return await userRepository.getUser(data);
    } catch (err) {
      console.error("error in service:", err.message);
      return { status: false, message: err.message };
    }
  }

    async loginUserService (data){
        try{
            const response = await userRepository.loginUser(data);
            if (response.status === false){
                return response
            }
            const userId = response.userId
            const token = jwt.sign(
                {userId : userId},
                process.env.JWT_SECRET,
                {expiresIn : "24h"}
            )
            return { status: true, token, userId}
        }catch(err){
            console.error(err.message);
            return { status: false, message: err.message };
        }
    }

    async getUsersFriendsService(data){
        try{
            const response = await userRepository.getUsersFriends(data);
            return response;
        }catch(err){
            return { status: false, message: err.message };
        }
    }

    async getMeService (data){
        try{
            const response = await userRepository.getMe(data);
            return response;
        }catch(err){
            console.error(err.message);
            return { status: false, message: err.message };
        }
    }
}

module.exports = new userServices();
