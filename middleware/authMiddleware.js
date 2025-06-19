const jwt = require("jsonwebtoken");
const userModel = require("../models/userSchema.js");

class AuthentificationMiddleware {
  async checkToken(req, res, next) {
    try {
      const token = req.cookies.token;
      if (!token) return res.status(401).send("pas des cookies");
      jwt.verify(token, process.env.secret_key, (err, decoded) => {
        if (err) {
          return res.status(401).send("invalid cookie, access denied");
        }
        req.decoded = decoded;
        next();
      });
    } catch (err) {
      console.error("error in middleware:", err.message);
      return res.status(500).json({ message: "server error" });
    }
  }

  async isUserExists(req, res, next) {
    try {
      const decoded = req.decoded;
      const user = await userModel.findById(decoded.id);
      if (!user) {
        return res
          .status(401)
          .send("this cookie owner no longer exists, access denied");
      }
      next();
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error");
    }
  }
}

module.exports = new AuthentificationMiddleware();
