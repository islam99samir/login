const express = require("express");
const pasth = require("path");
const bcrypt = require("bcrypt");

const app = express();
//--------------------------------
//-------DB----------
const User = require("./config");

// convert data into json format تحويل البيانات إلى تنسيق json
app.use(express.json()); //هذا السطر يستخدم middleware من Express.js للمساعدة في تحليل
app.use(express.urlencoded({ extended: false }));

//static file css
app.use(express.static("public"));

//API
// register user
//----signup--------

app.post("/signup", async (req, res) => {
  try {
    const userData = {
      FirstName: req.body.FirstName,
      LastName: req.body.LastName,
      email: req.body.email,
      password: req.body.password,
      gender: req.body.gender,
      BirthDate: req.body.BirthDate,
      username: req.body.username,
      phone: req.body.phone,
    };

    // Check if user already exists
    const existingUser = await User.findOne({
      username: userData.username,
      email: userData.email,
    });
    if (existingUser) {
      return res.status(400).send({
        message:
          "User already exists. Please choose a different username and email.",
      });
    }

    // Hash password
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(userData.password, saltRounds);
    userData.password = hashPassword;

    // Create new user
    const newUser = new User(userData);
    await newUser.save();

    res
      .status(201)
      .send({ message: "User created successfully", user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Server Error" });
  }
});
// ---------------------------------------------------------
//--login---
//login user
app.post("/login", async (req, res) => {
  try {
    // التحقق من وجود اسم المستخدم وكلمة المرور في جسم الطلب
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: "Missing username or password" });
    }

    // البحث عن المستخدم في قاعدة البيانات
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: "Username is incorrect" });
    }

    // المقارنة بين كلمة المرور المدخلة والمخزنة
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ error: "Incorrect password" });
    }

    // إعادة بيانات المستخدم بدون كلمة المرور
    const userData = {
      username: user.username,
      FirstName: user.FirstName,
      LastName: user.LastName,
      BirthDate: user.BirthDate,
      email: user.email,
      gender: user.gender,
      phone: user.phone,
    };
    res.json(userData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
});
//------------------------------------------
// Deploymant Access & Comprssion data
const cors = require("cors");
app.use(cors());
//compress all responses
const Comprssion = require("compression");
app.use(Comprssion());

const port = 5000;
app.listen(port, () => {
  console.log(`server run port on ${port}`);
});
