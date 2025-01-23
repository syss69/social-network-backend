const mongoose = require("mongoose");

const mongoConnect = async () => {
  try {
    mongoose.connect(process.env.URL_DATABASE);
    console.info("Mongodb est connecte");
  } catch (err) {
    console.error("Erreur de connection avec mongodb", err.message);
  }
};

module.exports = mongoConnect();
