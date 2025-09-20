 const mongoose = require("mongoose");
 const courseSchema = new mongoose.Schema({
    
    courseName:{
        type:String,
        required:true,

    },
    courseDescription:{
        type:String,
        required:true,
    },
    instructor:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
    },
    whatYouWillLearn:{
        type:String,
    },
    courseContent:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Section",
        }
    ],
    ratingAndReviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"RatingAndReview"
        }
    ],
    price:{
        type:Number,
    },
    thumnail:{
        type:String,
    },
    tag:{
        type:[String],
        ref:"Category",
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"

    },
    studentsEnrolled:[
        {
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"User",
        }
    ],
    instruction:{
        type:[String],
    },
    status:{
        type:String,
        enum:["Draft","Published"],
    },

    
   

 });
 module.exports = mongoose.model("Course",courseSchema);