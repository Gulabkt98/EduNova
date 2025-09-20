 const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
 const otpEmail = require("../mail/templates/otpEmail");
 const OTPSchema = new mongoose.Schema({

    email:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires: 10*60*60,
    },

 
 });

 /// a function  that sendmail:-
async function sendVerificationEmail(email,otp){
    try{
        const mailResponse= await mailSender(email,"Verification mail from EduNova",otpEmail(otp));
        console.log("Email sent successfully :",mailResponse);

    }
    catch(error){
        console.log("error occured while sending mail",error);
        throw error;
    }
}

// db me document send hone se just phle otp mail send hona chahiye isiliye pre middleware use krenge

OTPSchema.pre("save",async function(next){
    await sendVerificationEmail(this.email,this.otp);
    next(); // next middlleware pr  chle jao 
})
 

 module.exports = mongoose.model("OTP",OTPSchema);