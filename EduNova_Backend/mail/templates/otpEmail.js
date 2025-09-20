module.exports = function otpEmail(otp) {
  return `
  <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; background: #f4f4f7;">
    <div style="max-width: 500px; margin: auto; background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0px 2px 10px rgba(0,0,0,0.1);">
      
      <!-- Logo -->
      <div style="margin-bottom: 20px; display:flex; align-items:center; justify-content:center; gap:10px;">
        <div style="width:40px; height:40px; border-radius:50%; background:linear-gradient(135deg,#2d89ef,#00c6ff); display:flex; align-items:center; justify-content:center; color:white; font-weight:bold; font-size:18px;">
          E
        </div>
        <span style="font-size:22px; font-weight:bold; color:#2d89ef; letter-spacing:1px;">EduNova</span>
      </div>

      <!-- Heading -->
      <h2 style="color: #333;">Email Verification</h2>
      <p style="color: #555;">Please use the OTP below to verify your email:</p>

      <!-- OTP -->
      <h1 style="font-size: 36px; color: #2d89ef; margin: 20px 0;">${otp}</h1>

      <p style="color: #777;">This OTP will expire in <b>10 minutes</b>. Please do not share it with anyone.</p>

      <hr style="margin: 25px 0;">

      <!-- Footer -->
      <p style="font-size: 12px; color: #999;">© ${new Date().getFullYear()} EduNova. All rights reserved.</p>
    </div>
  </div>
  `;
};
