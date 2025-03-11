const express = require("express");
const router = express.Router();
const userController = require("../controllers/controllerUsers.js");
const authMiddleware = require("../middleware/authMiddleware.js");

const authentificateToken = async (req, res, next) => {
  return await authMiddleware.checkToken(req, res, next);
};

const isUserExist = async (req, res, next) => {
  return await authMiddleware.isUserExists(req, res, next);
};

router.post("/create", userController.createUser);
router.post("/login", userController.loginUser);
router.get("/:id", authentificateToken, isUserExist, userController.getUser);

module.exports = router;
