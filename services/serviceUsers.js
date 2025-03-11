const userRepository = require("../repositories/userRepository.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();

class userServices {
  async createUserService(data) {
    try {
      return await userRepository.createUser(data);
    } catch (err) {
      console.error(err.message);
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

  async loginUserService(data) {
    try {
      const response = await userRepository.loginUser(data);
      const token = jwt.sign({ id: response.userId }, process.env.secret_key, {
        expiresIn: "30m",
      });
      return { response, token };
    } catch (err) {
      console.error(err.message);
    }
  }
}

module.exports = new userServices();
