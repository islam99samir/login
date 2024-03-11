
const mongoose=require("mongoose")
const connect=mongoose.connect("mongodb://localhost:27017/Login-tut");

connect.then(()=>{
    console.log("DB ok");
}).catch(()=>{
    console.log("DB NO");
})
//create schema
const LoginSchema = new mongoose.Schema({
    name: {
      type: String,
      requierd: true,
    },
    name2: {
      type: String,
      requierd: true,
    },
    email: {
      type: String,
      requierd: true,
    },
    date: {
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
const collaction=new mongoose.model("users",LoginSchema)
module.exports=collaction;