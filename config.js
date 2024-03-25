const mongoose = require("mongoose");
// const connect = mongoose.connect("mongodb://localhost:27017/Login-tut");
const dot_env = require("dotenv");
const path = require("path");
dot_env.config({ path: path.join(__dirname, ".env") });
const DB_URL = process.env.DB_URL;
const connect = mongoose.connect(DB_URL);
console.log(DB_URL);
connect
  .then(() => {
    console.log("database is connencted");
  })
  .catch((err) => {
    console.log("database filled to connection", err);
  });
//create schema
const schema_web = new mongoose.Schema({
  FirstName: {
    type: String,
    requierd: true,
  },
  LastName: {
    type: String,
    requierd: true,
  },
  email: {
    type: String,
    requierd: true,
  },
  BirthDate: {
    type: String,
    requierd: true,
  },
  gender: {
    type: String,
    requierd: true,
  },
  username: {
    type: String,
    requierd: true,
  },
  phone: {
    type: String,
    requierd: true,
  },
  password: {
    type: String,
    requierd: true,
  },
});
//collaction part
const collaction = new mongoose.model("users", schema_web);
module.exports = collaction;
