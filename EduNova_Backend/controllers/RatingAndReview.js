const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");
const User = require("../models/User");
const { default: mongoose } = require("mongoose");

// create a rating and review for a course
exports.createRating = async (req,res)=>{
    try{
        // fetch user id from req body
        const userId = req.user._id;
        const {courseId, rating, review} = req.body;
        //validation
        if(!courseId || !rating || !review){
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            });
        }
        //check if user is enrolled in the course or not
        const courseDetails = await Course.findOne(
            {_id:courseId, studentsEnrolled:{$in:[mongoose.Types.ObjectId(userId)]}}
        );
        if(!courseDetails){
            return res.status(403).json({
                success:false,
                message:"User is not enrolled in the course",
            });
        }

        //check user has already given review or not
        const existingReview = await RatingAndReview.findOne({user:userId, course:courseId});
        if(existingReview){
            return res.status(403).json({
                success:false,
                message:"User has already given review for this course",
            });
        }
        //create new rating and review
        const newRatingAndReview = await RatingAndReview.create({
            user:userId,
            course:courseId,
            rating,
            review,
        });
        //add review to course schema

        courseDetails.ratingAndReviews.push(newRatingAndReview._id);
        await courseDetails.save();
        //add review to user schema

        const userDetails = await User.findById(userId);
        userDetails.ratingAndReviews.push(newRatingAndReview._id);
        await userDetails.save();

        // return response

        return res.status(200).json({
            success:true,
            message:"Rating and review added successfully",
            data:newRatingAndReview,
        });
    
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal server error",
            error:error.message,
        });
    }
};



//get average rating of a course
exports.getAverageRating= async (req,res)=>{
    try{
        const courseId = req.body.courseId;    
        //validation
        if(!courseId){
            return res.status(400).json({
                success:false,
                message:"Course id is required",
            });
        }
        //calculate average rating using aggregation
        const result = await RatingAndReview.aggregate([
            { $match: { course: mongoose.Types.ObjectId(courseId) } },// course id string ko object id me convert karna hain},
            {
                $group: {   
                    _id: null,
                    averageRating: { $avg: "$rating" },
                },  
            },
        ]);
        // return rating
            if(result.length>0){
                return res.status(200).json({
                    success:true,
                    message:"Average rating fetched successfully",
                    data:result[0].averageRating,
                });
            }
            else{
                return res.status(200).json({
                    success:true,
                    message:"Average rating fetched successfully",
                    data:0,
                });
            }


    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal server error",
            error:error.message,
        });
    }
};



//get all rating and reviews of a course
exports.getAllReviews = async (req,res)=>{
    try{
        const allReviews = await RatingAndReview.find({})
        .sort({rating:"desc"})
        .populate({
            path:"user",
            select:"firstName lastName email image"
        })
        .populate({
            path:"course",
            select:"courseName"});
        return res.status(200).json({
            success:true,
            message:"All reviews fetched successfully",
            data:allReviews,
        });

    
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal server error",
            error:error.message,
        });

    
    }
}
