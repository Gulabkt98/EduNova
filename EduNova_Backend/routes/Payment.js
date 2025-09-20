const express = require("express");
const router = express.Router();

const { auth } = require("../middlewares/auth");

const {
  capturePayment,
  verifySignature,
} = require("../controllers/Payments");

//  Capture payment (protected - student must be logged in)
router.post("/capturePayment", auth, capturePayment);

//  Verify Razorpay signature (Razorpay webhook will call this)
router.post("/verifySignature", verifySignature);

module.exports = router;
