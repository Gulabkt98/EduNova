const Profile = require("../models/Profile");
const User = require("../models/User");
const Course = require("../models/Course");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
require("dotenv").config();

exports.updateProfile = async (req, res) => {
    try {
        // fetch user id
        const{dateOfBirth="", about="" , contactNumber, gender} = req.body;
        const Id = req.user._id;
        // fetch user details
        
        if (!contactNumber || !dateOfBirth || !about) {  
            return res.status(404).json({
                success: false,
                message: "fill all the required fields",
            });
        }

        //find profile in user
        const userDetails = await User.findOne({ _id: Id });
        const profileId = userDetails.additionalDetails;
        const profileDetails = await Profile.findById(profileId);


        //update profile
        profileDetails.dateOfBirth=dateOfBirth;
        profileDetails.about=about;
        profileDetails.gender=gender;
        profileDetails.contactNumber=contactNumber;
        //save in db
        await profileDetails.save();
        // return response
        return res.status(200).json({
            success:true,
            message:"Profile Updated Successfully",
            profileDetails,
        })


    }catch (error) {
        console.error("Error fetching user details:", error);
        return res.status(500).json({
            success: false,
            message: `Internal server error while updating profile: ${error.message}`,
        });
    }
}   /// api test done

/// delete account 
exports.deleteAccount = async (req, res) => {
    try {
        // fetch user id
        const Id = req.user._id;
        // find user details
        const userDetails = await User.findById(Id);
        if (!userDetails) {     
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }  
        // delete user profile
        const profileId = userDetails.additionalDetails;
        const profileDetails = await Profile.findByIdAndDelete(profileId);
        if (!profileDetails) {  
            return res.status(404).json({
            success: false,
            message: "Profile not found",
            });
        }           
        // delete user
        const deleteUser = await User.findByIdAndDelete(Id); 
        if (!deleteUser) {  
            return res.status(404).json({
            success: false,
            message: "User not found",
            });
        }
        // unenroll: delete user from all courses
        await Course.updateMany(
            { studentsEnrolled: Id },
            { $pull: { studentsEnrolled: Id } }
        );

        // return response
        return res.status(200).json({   
            success: true,
            message: "Account deleted successfully",
        });


    } catch (error) {
        console.error("Error deleting account:", error);    
        return res.status(500).json({
            success: false,
            message: "Internal server error while deleting account",
        });     
    }
};      

////get aLL user details
exports.getUserDetails = async (req, res) => {
    try {
        // fetch user id
        const Id = req.user._id;
        // find user details
        const userDetails = await User.findById(Id).populate("additionalDetails").exec();
        if (!userDetails) {                     
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }   
        // return response
        return res.status(200).json({   
            success: true,
            message: "User details fetched successfully",
            data: userDetails,
        });
    } catch (error) {
        console.error("Error fetching user details:", error);   
        return res.status(500).json({
            success: false,
            message: "Internal server error while fetching user details",
        });     
    }
};   ///api test done


//update display picture


function isFileTypeSupported(type, supportedType) {
  return supportedType.includes(type);
}


exports.updateDisplayPicture = async (req, res) => {
  try {
    const userId = req.user?._id;
    const file = req.files?.displayPicture;

    if (!file) {
      return res.status(400).json({
        success: false,
        message: 'Display picture is required',
      });
    }

    // File extension validation
    const supportedTypes = ['jpg', 'jpeg', 'png'];
    const fileType = file.name.split('.').pop().toLowerCase();

    if (!isFileTypeSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: 'File format not supported',
      });
    }

    // Upload to Cloudinary
    const uploadResponse = await uploadImageToCloudinary(file, 'displayPictures');

    if (!uploadResponse) {
      return res.status(500).json({
        success: false,
        message: 'Error uploading display picture',
      });
    }

    const userDetails = await User.findById(userId);
    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    userDetails.image = uploadResponse.secure_url || uploadResponse.url;
    await userDetails.save();

    return res.status(200).json({
      success: true,
      message: 'Display picture updated successfully',
      userDetails,
    });
  }
  
  catch (error) {
    console.error('Error updating display picture:', error);
    return res.status(500).json({
      success: false,
      message: `Internal server error: ${error.message}`,
    });
  }
}; ///api test done



//get enrolled courses
exports.getEnrolledCourses = async (req, res) => {
    try {
        const Id = req.user._id;    
        const userDetails = await User.findById(Id).populate("courses").exec();
        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Enrolled courses fetched successfully",
            courses: userDetails.courses,
        });
    } catch (error) {
        console.error("Error fetching enrolled courses:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error while fetching enrolled courses",
        });
    }
};

