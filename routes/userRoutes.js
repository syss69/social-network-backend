const express = require("express");
const checkUser = require("../middlewares/authMiddleware.js")

const router = express.Router();
const userController = require("../controllers/controllerUsers.js")

router.post("/create", userController.createUser)
router.post("/login", userController.loginUser);
router.get("/id/:id",  userController.getUser);
router.get("/friends/:id", userController.getUsersFriends)
router.get("/me", checkUser, userController.getMe)

router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logged out successfully' });
});


module.exports = router;
