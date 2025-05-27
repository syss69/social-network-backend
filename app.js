const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser")

const userRoutes = require("./routes/userRoutes.js");
const postRoutes = require("./routes/postRoutes.js");
const conversationRoutes = require("./routes/conversationRoutes.js")
const messageRoutes = require("./routes/messageRoutes.js")
const mongooseConnect = require("./config/db.js");

const app = express();
const port = 3000;

app.use(
  cors({
    origin: process.env.URL_FRONT,
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true
  })
);

app.use(cookieParser());

app.use(express.json());

app.use("/users", userRoutes);

app.use("/posts", postRoutes);

app.use("/conversation", conversationRoutes);

app.use("/message", messageRoutes)

app.listen(port, () => {
  console.info("Serveur est demaree sur http://localhost:3000");
});
