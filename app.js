const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");

const userRoutes = require("./routes/userRoutes.js");
const profileRoutes = require("./routes/profileRoutes.js");
const postRoutes = require("./routes/postRoutes.js");
const mongooseConnect = require("./config/db.js");

const app = express();
const port = 3000;
console.log("hello artem");
/*
app.use(
  cors({
    origin: "http://127.0.0.1:5501",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);
*/
app.use(cookieParser());

app.use(express.json());
app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/users", userRoutes);

app.use("/profile", profileRoutes);

app.use("/posts", postRoutes);

app.listen(port, () => {
  console.info("Serveur est demaree sur http://localhost:3000");
});
