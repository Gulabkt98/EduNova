module.exports = function courseEnrollmentEmail(otp) {
  return `
    <div style="font-family: Arial, sans-serif; text-align:center; padding:20px;">
      <img src="https://i.postimg.cc/mr9bsqNw/edunova-logo.png" alt="EduNova Logo" width="120" />
      <h2 style="color:#2E86C1;">EduNova Verification</h2>
      <p style="font-size:16px;">Your One-Time Password (OTP) is:</p>
      <h1 style="font-size:32px; letter-spacing:5px; color:#E74C3C;">${otp}</h1>
      <p style="font-size:14px; color:#555;">This OTP is valid for 5 minutes. Please do not share it with anyone.</p>
    </div>
  `;
};
