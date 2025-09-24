// ===============================
// Auth.js Controller
// Handles authentication logic such as OTP generation, user registration, login, and password change.
// ===============================

const User = require("../models/User"); // Import User model for user data
const Profile = require("../models/Profile"); // Import Profile model for additional user info
const OTP = require("../models/OTP"); // Import OTP model to store and validate OTPs
const otpGenerator = require("otp-generator"); // Library to generate OTPs
const bcrypt = require("bcrypt"); // Library to hash/compare passwords securely
const jwt = require("jsonwebtoken"); // For generating and verifying JSON Web Tokens
require("dotenv").config(); // Load environment variables from .env file

// otpEmail = require("../mail/templates/otpEmail"); // Example: could be used for OTP email template
// const mailSender = require("../utils/mailSender"); // Example: custom mail utility for sending emails

// ------------------- SEND OTP -------------------
exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body; // Extract email from request body

    // Check if user already exists in DB
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already registered", // Prevent sending OTP to already registered users
      });
    }

    // Generate a 6-digit OTP (only numbers allowed here)
    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    console.log("OTP generated:", otp);

    // Ensure OTP is unique in the DB (edge case, since OTP is short-lived)
    let result = await OTP.findOne({ otp });
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      result = await OTP.findOne({ otp });
    }

    // Save OTP into DB (could trigger pre-save middleware to send OTP email)
    await OTP.create({ email, otp });

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully", // Inform frontend
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: `Internal error while sending OTP: ${error.message}`, // Send proper error message
    });
  }
};

// ------------------- SIGN UP -------------------
exports.signUp = async (req, res) => {
  try {
    // Extract fields from request body
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      contactNumber,
      otp,
    } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !password || !confirmPassword || !otp) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Ensure password and confirm password match
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password and confirm password do not match",
      });
    }

    // Check if user already exists with this email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already registered",
      });
    }

    // Fetch the most recent OTP for this email
    const recentOtpDoc = await OTP.findOne({ email }).sort({ createdAt: -1 });
    if (!recentOtpDoc) {
      return res.status(400).json({
        success: false,
        message: "OTP not found or expired",
      });
    }

    // Verify entered OTP matches the one in DB
    if (otp !== recentOtpDoc.otp) {
      return res.status(400).json({
        success: false,
        message: "OTP does not match",
      });
    }

    // Hash password before saving user
    const hashPassword = await bcrypt.hash(password, 10);

    // Create an empty profile linked to the user
    const profileDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contactNumber: contactNumber || null,
    });

    // Create new user document
    const user = await User.create({
      firstName,
      lastName,
      email,
      contactNumber,
      password: hashPassword,
      accountType,
      additionalDetails: profileDetails._id, // Linking profile
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`, // Default avatar
    });

    // Remove sensitive info before sending response
    user.password = undefined;

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "User cannot be registered, please try again",
    });
  }
};

// ------------------- LOGIN -------------------
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body; // Extract login credentials

    // Ensure both fields are provided
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Find user and populate profile details
    const user = await User.findOne({ email }).populate("additionalDetails");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not registered, please signup",
      });
    }

    // Compare provided password with hashed password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Password is incorrect",
      });
    }

    // Create JWT payload
    const payload = {
      email: user.email,
      _id: user._id,
      accountType: user.accountType,
    };

    // Generate JWT token (valid for 2 hours)
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "2h" });

    // Hide password from response
    user.password = undefined;
    user.token = token;

    // Cookie options (secure and httpOnly for production)
    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Secure only in production
      sameSite: "Strict",
    };

    // Send response with cookie + token
    return res.cookie("token", token, options).status(200).json({
      success: true,
      token,
      user,
      message: "Logged in successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal error while login",
    });
  }
};

// ------------------- CHANGE PASSWORD -------------------
exports.changePassword = async (req, res) => {
  try {
    // Extract old and new passwords
    const { oldPassword, newPassword, confirmNewPassword } = req.body;

    // Validate required fields
    if (!oldPassword || !newPassword || !confirmNewPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Ensure new password and confirm password match
    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({
        success: false,
        message: "New password and confirm password do not match",
      });
    }

    // User ID will be set from auth middleware
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Verify old password before updating
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Old password is incorrect",
      });
    }

    // Hash new password and update
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while changing password",
    });
  }
};
