const express = require("express");
const router = express.Router();
const {auth }= require("../middlewares/auth");
const {
    deleteAccount,
    updateProfile,
    getUserDetails,
    updateDisplayPicture,
     getEnrolledCourses,

}= require("../controllers/Profile");

router.delete("/deleteProfile",auth,deleteAccount);
router.put("/updateProfile",auth,updateProfile); // done
router.get("/getUserDetails",auth,getUserDetails); // done

//get enrolled courses
router.put("/updateDisplayPicture",auth,updateDisplayPicture); // done
router.get("/getEnrolledCourses",auth,getEnrolledCourses);  

module.exports = router;