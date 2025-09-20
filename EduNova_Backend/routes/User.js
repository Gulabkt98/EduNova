const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth");

const {
    login,
    signUp,       
    sendOTP,
    changePassword,
} = require("../controllers/Auth");

const {
    resetPasswordToken,
    resetPassword,
} = require("../controllers/ResetPassword"); 


// routes for user login 
router.post("/login", login);  //done

// routes for user signup
router.post("/signup", signUp);   //done

// routes for sending OTP
router.post("/sendotp", sendOTP); //done

// route for changing password (protected)
router.post("/changepassword", auth, changePassword);    // done   

// routes for resetting password
router.post("/reset-password-token", resetPasswordToken);//done
router.post("/reset-password", resetPassword); //done

module.exports = router;
