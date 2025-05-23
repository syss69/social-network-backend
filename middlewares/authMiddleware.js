const userModel = require("../models/userSchema.js");
const jwt = require("jsonwebtoken")

const checkToken = async (req, res, next) => {
  const userCookie = req.cookies.token;
  if (!userCookie) {
    return res.status(401).send("cookie missed");
  }
  try {
    const decoded = jwt.verify(userCookie, process.env.JWT_SECRET);
    const userId = decoded.userId;
    const user = await userModel.findById(userId);
    if (!user) {
      return res
        .status(401)
        .send("Your token is invalid, please try to reconnect to the service");
    }
    req.userId = userId;
    next();
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Iternal server error");
  }
};

module.exports = checkToken;