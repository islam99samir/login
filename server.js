// server.js

// تحميل الحزم اللازمة
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const compression = require("compression");

// تكوين متغيرات البيئة من ملف .env
dotenv.config();

// تكوين التطبيق Express
const app = express();

// توصيل قاعدة البيانات
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to database"))
  .catch((err) => console.error("Database connection error:", err));

// تحميل ملفات الراوتر
const indexRoutes = require("./index.js");
const indexRoutesC = require("./course.js");

// تفعيل الوسيط لتحليل جسم الطلب
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// تمكين CORS
app.use(cors());

// تضغط الاستجابات
app.use(compression());

// توجيه الطلبات إلى المسارات المناسبة
app.use("/api", indexRoutes);
app.use("/api", indexRoutesC);

// تشغيل الخادم
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
