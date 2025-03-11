const userModel = require("../models/userSchema.js");
const profileModel = require("../models/profileSchema.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();

class repoUser {
  constructor() {}
  async loginUser(data) {
    try {
      const user = await userModel.findOne({
        username: data.username,
        password: data.password,
      });
      if (!user) {
        return {
          status: false,
          message: "Username does not exist or password is not correct",
        };
      } else {
        return {
          status: true,
          message: "Authentificated",
          userId: user._id,
        };
      }
    } catch (err) {
      console.error(err);
      return { status: false, message: "Internal server error" };
    }
  }
  async getUser(data) {
    const user = await userModel.findById(data);
    if (user) {
      return { status: true };
    } else {
      return { status: false };
    }
  }

  async createUser(data) {
    try {
      const user = new userModel({
        username: data.username,
        email: data.email,
        password: data.password,
      });
      try {
        await user.save();
        return { status: true, message: "User saved", userId: user._id };
      } catch (err) {
        if (err.message.slice(0, 26) === "E11000 duplicate key error") {
          return {
            status: false,
            message: "Username or email already exist",
            id: user._id,
          };
        }
      }
    } catch (err) {
      console.error(err.message);
      return { status: false, message: "Internal server error" };
    }
  }
}

module.exports = new repoUser();
