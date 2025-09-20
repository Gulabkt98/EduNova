const express = require("express");
const router = express.Router();

const { auth ,isInstructor, isAdmin } = require("../middlewares/auth");

const {createCategory,showAllCategories,categoryPageDetails} = require("../controllers/Category");

const {createSubSection,deleteSubSection,updateSubSection}= require("../controllers/SubSection");

const {createCourse,getAllCourses,getCourseDetails} = require("../controllers/Course");

const {getAllReviews} = require("../controllers/RatingAndReview");

const{createSection,deleteSection,updateSection}= require("../controllers/Section");

const { uploadImageToCloudinary } = require("../utils/imageUploader");

// Create a new course (protected, only instructors can do this)
router.post("/createcourse", auth, isInstructor, createCourse); // done

// Get all courses (public)
router.get("/getallcourses", getAllCourses); // done

// Get details of a single course by ID (public)
router.post("/getCourseDetails", getCourseDetails); // done

// Upload an image (protected, instructors only)
router.post("/uploadimage", auth, isInstructor, uploadImageToCloudinary);

// Get all reviews
router.get("/getReviews", getAllReviews);

// catagory routes/////           //////////////
router.post("/createcategory",auth,isAdmin,createCategory); // only admin can create category //done
router.get("/showallcategories",showAllCategories); /// done
router.post("/categorypagedetails",categoryPageDetails);

// section routes /////////////////
router.post("/addSection",auth,isInstructor,createSection); // done
router.post("/deletesection",auth,isInstructor,deleteSection);//done
router.post("/updatesection",auth,isInstructor,updateSection);//`done

/////subsection routes /////////////////
router.post("/addSubSection",auth,isInstructor,createSubSection); // done
router.post("/deletesubsection",auth,isInstructor,deleteSubSection);//done
router.post("/updatesubsection",auth,isInstructor,updateSubSection); //done

module.exports = router;
