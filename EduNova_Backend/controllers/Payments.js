const{instance}=require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail");
const { default: mongoose } = require("mongoose");

//capture payment and initiate razorpay order
exports.capturePayment = async (req,res)=>{
    //get course id and user id
    try{
    const {courseId} = req.body;
    const userId = req.user.id;
    //validation
    if(!courseId){
        return res.status(400).json({
            success:false,
            message:"Course id is required",
        });
    }
    //validate course id
    //validate course details from db
    let course;
    try{
        course = await Course.findById(courseId);
        if(!course){
            return res.status(404).json({
                success:false,
                message:"Course not found",
            });
        }

        //user already pay for the same course 
        const uid = new mongoose.Types.ObjectId(userId); // bz course me user id as objectid store hain
         if(course.studentsEnrolled.includes(uid)){
            return res.status(400).json({
                success:false,
                message:"Student already enrolled",
            });
         }
    
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Internal server error while fetching course",
        });
    }
    //create an order in razorpay  
    const amount = course.price;
    const currency = "INR";
    const options={
        amount:amount*100,
        currency,
        receipt:`receipt_order_${Math.random() * 1000}`,
        notes:{ // additional info
            courseId:courseId,
            userId,
        },
    }; 

    try {
        //initiate order
        const paymentResponse = await instance.orders.create(options);
        console.log(paymentResponse);
        // return response
        return res.status(200).json({
            success:true,
            message:"Razorpay order created successfully",
            courseName:course.courseName,
            courseDescription:course.courseDescription,
            amount:amount,
            currency:currency,
            orderId:paymentResponse.id,
        });
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Internal server error while creating razorpay order",
        });
    }
    

    
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}

///verify signature of razorpay and server\

exports.verifySignature = async (req,res)=>{
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    const signature = req.headers["x-razorpay-signature"];///razorpay signature it is hash value of body+webhook secret
    const shasum = crypto.createHmac("sha256",webhookSecret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");
    if(signature===digest){
        console.log("payement is authorised");

        const{courseId,userId} = req.body.payload.payment.entity.notes;
        //enroll the student
        try{
            const enrolledCourse = await Course.findByIdAndUpdate(
                courseId,
                {
                    $push:{studentsEnrolled: userId},
                },
                {new:true}
            );
            if(!enrolledCourse){
                return res.status(500).json({
                    success:false,
                    message:"Course not found",
                });
            }
            const userupdate= await User.findByIdAndUpdate(
                {_id:userId}, // filter
                {$push:{courses:courseId}},// user ke courses me course id push krdo
                {new:true}, // return the updated document
            );
            if(!userupdate){
                return res.status(500).json({
                    success:false,
                    message:"User not found",
                });
            }
            //send confirmation email to student
            const emailResponse = await mailSender(
                userupdate.email,   
                "Congratulations! Enrolled Successfully",
                courseEnrollmentEmail(
                    userupdate.firstName,
                    userupdate.lastName,
                    enrolledCourse.courseName,
                    enrolledCourse.courseDescription,       
                )
            );
            console.log("Email sent successfully",emailResponse);

            return res.status(200).json({
                success:true,
                message:"Student enrolled successfully in the course",
                enrolledCourse,
            });

        }
        catch(error){
            return res.status(500).json({
                success:false,
                message:"Error enrolling the student",
            });
        }
    }
    else{
        // forbidden
        return res.status(403).json({
            success:false,
            message:"Invalid signature",
        });
    }


}