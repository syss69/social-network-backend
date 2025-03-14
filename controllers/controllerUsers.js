const express = require("express");
const userService = require("../services/serviceUsers.js");

class userController {
  async createUser(req, res) {
    try {
      const newUser = await userService.createUserService(req.body);
      if (newUser.status == false) {
        return res.status(409).json(newUser);
      }
      res.status(201).json(newUser);
    } catch (err) {
      res.status(500).json({ status: false, message: err.message });
    }
  }
  async loginUser(req, res) {
    try {
      const user = await userService.loginUserService(req.body);
      if (user.status == false) {
        return res.status(404).json(user.response);
      }
      res
        .cookie("token", user.token, {
          httpOnly: true,
          maxAge: 1800000,
        })
        .json(user.response);
    } catch (err) {
      res.status(500).json({ status: false, message: err.message });
    }
  }
  async getUser(req, res) {
    try {
      const user = await userService.getUserService(req.params.id);
      if (user.status == false) {
        return res.status(404).json(user);
      }
      res.json(user);
    } catch (err) {
      res.status(500).json({ status: false, message: err.message });
    }
  }
}

module.exports = new userController();
