const BASE_URL = process.env.REACT_APP_BASE_URL;

// ======================= AUTH ENDPOINTS =======================
export const endpoints = {
  SENDOTP_API: BASE_URL + "/auth/sendotp",
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
  RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
  RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
};

// ======================= PROFILE ENDPOINTS =======================
export const profileEndpoints = {
  GET_USER_DETAILS_API: BASE_URL + "/profile/getUserDetails",               // Protected route, needs token
  GET_USER_ENROLLED_COURSES_API: BASE_URL + "/profile/getEnrolledCourses",  // Protected route
  GET_INSTRUCTOR_DATA_API: BASE_URL + "/profile/instructorDashboard",       // Protected route
};

// ======================= STUDENT ENDPOINTS =======================
export const studentEndpoints = {
  COURSE_PAYMENT_API: BASE_URL + "/payment/capturePayment",
  COURSE_VERIFY_API: BASE_URL + "/payment/verifyPayment",
  SEND_PAYMENT_SUCCESS_EMAIL_API: BASE_URL + "/payment/sendPaymentSuccessEmail",
};

// ======================= COURSE ENDPOINTS =======================
export const courseEndpoints = {
  GET_ALL_COURSE_API: BASE_URL + "/course/getallcourses",                 // GET
  COURSE_DETAILS_API: BASE_URL + "/course/getCourseDetails",              // POST
  EDIT_COURSE_API: BASE_URL + "/course/editCourse",                       // Implement if backend exists
  COURSE_CATEGORIES_API: BASE_URL + "/course/showallcategories",          // GET
  CREATE_COURSE_API: BASE_URL + "/course/createcourse",                   // POST
  CREATE_SECTION_API: BASE_URL + "/course/addSection",                     // POST
  CREATE_SUBSECTION_API: BASE_URL + "/course/addSubSection",               // POST
  UPDATE_SECTION_API: BASE_URL + "/course/updatesection",                  // POST
  UPDATE_SUBSECTION_API: BASE_URL + "/course/updatesubsection",            // POST
  GET_ALL_INSTRUCTOR_COURSES_API: BASE_URL + "/course/getInstructorCourses", // Implement if backend exists
  DELETE_SECTION_API: BASE_URL + "/course/deletesection",                  // POST
  DELETE_SUBSECTION_API: BASE_URL + "/course/deletesubsection",            // POST
  DELETE_COURSE_API: BASE_URL + "/course/deleteCourse",                    // Implement if backend exists
  GET_FULL_COURSE_DETAILS_AUTHENTICATED: BASE_URL + "/course/getFullCourseDetails", // Implement if backend exists
  LECTURE_COMPLETION_API: BASE_URL + "/course/updateCourseProgress",       // Implement if backend exists
  CREATE_RATING_API: BASE_URL + "/course/createRating",                    // Implement if backend exists
};

// ======================= RATINGS AND REVIEWS =======================
export const ratingsEndpoints = {
  REVIEWS_DETAILS_API: BASE_URL + "/course/getReviews",                   // GET
};

// ======================= CATEGORIES API =======================
export const categories = {
  CATEGORIES_API: BASE_URL + "/course/showallcategories",                 // GET
};

// ======================= CATALOG PAGE DATA =======================
export const catalogData = {
  CATALOGPAGEDATA_API: BASE_URL + "/course/categorypagedetails",          // POST
};

// ======================= CONTACT-US API =======================
export const contactusEndpoint = {
  CONTACT_US_API: BASE_URL + "/reach/contact",                            // POST
};

// ======================= SETTINGS PAGE API =======================
export const settingsEndpoints = {
  UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updateDisplayPicture", // POST
  UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",                 // POST
  CHANGE_PASSWORD_API: BASE_URL + "/auth/changepassword",                  // POST
  DELETE_PROFILE_API: BASE_URL + "/profile/deleteProfile",                 // POST
};
