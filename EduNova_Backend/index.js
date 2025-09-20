const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload"); 

///models
// Import all Mongoose models to register them with Mongoose
require("./models/User");
require("./models/Course");
require("./models/Categories");
require("./models/Section");
require("./models/SubSection");
require("./models/RatingAndReview");
require("./models/CourseProgress");
require("./models/OTP");
require("./models/Profile");
  

require("dotenv").config();

// import routes
const userRoutes = require("./routes/User");
const courseRoutes = require("./routes/Course");
const paymentRoutes = require("./routes/Payment");
const profileRoutes = require("./routes/Profile");

// import configs
const database = require("./config/database");
const { cloudinaryConnect } = require("./config/cloudinary");

const PORT = process.env.PORT || 8000;

// connect to database
database.connectdb();

// middleware
app.use(express.json());
app.use(cookieParser());

app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);

app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp",
    })
);

// connect cloudinary
cloudinaryConnect();

// mount routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
//app.use("/api/v1/admin", adminRoutes);

// default route
app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "Your server is up and running",
    });
});

// start server
app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`);
});
