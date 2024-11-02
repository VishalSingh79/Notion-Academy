// Import the required modules
const express = require("express")
const router = express.Router()

// Import the Controllers

// Course Controllers Import
const {
  createCourse,
  getAllCourses,
  getCourseDetails,
  editCourse,
  getInstructorCourses,
  deleteCourse,
  getFullCourseDetails,
  getAllWishlistCourses,
  removeWishList,
  allEnrolledCourses,
  addWishlist,
  getDetailedEnrolledCourse
} = require("../controllers/Course")

const {enrollCourses} = require("../controllers/Course");

// Categories Controllers Import
const {
  showAllCategories,
  createCategory,
  categoryPageDetails,
} = require("../controllers/Category")

// Sections Controllers Import
const {
  createSection,
  updateSection,
  deleteSection,
} = require("../controllers/Section")

// Sub-Sections Controllers Import
const {
  createSubSection,
  updateSubSection,
  deleteSubSection,
} = require("../controllers/SubSection")

// Rating Controllers Import
const {
  createRating,
  getAverageRating,
  getAllRating,
} = require("../controllers/RatingAndReviews")
//forum

const {
  createQuestion,
  createAnswer,
  getAllQuestions
} =require("../controllers/forum");

//likingAnswer

const{
  likingAnswer
}=require("../controllers/LikingAnswer");


// Importing Middlewares
const { auth, isInstructor, isStudent, isAdmin } = require("../middlewares/auth")


//                                      Course routes


// Courses can Only be Created by Instructors
router.post("/createCourse", auth, isInstructor, createCourse)
// Edit Course routes
router.post("/editCourse", auth, isInstructor, editCourse)
//Add a Section to a Course
router.post("/addSection", auth, isInstructor, createSection)
// Update a Section
router.put("/updateSection", auth, isInstructor, updateSection)
// Delete a Section
router.post("/deleteSection", auth, isInstructor, deleteSection)
// Edit Sub Section
router.put("/updateSubSection", auth, isInstructor, updateSubSection)
// Delete Sub Section
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection)
// Add a Sub Section to a Section
router.post("/addSubSection", auth, isInstructor, createSubSection)
// Get all Registered Courses
router.get("/getAllCourses", getAllCourses)
// Get Details for a Specific Courses
router.get("/getCourseDetails", getCourseDetails)
//getting all courses of instructor
router.get('/getInstructorCourses',auth, isInstructor, getInstructorCourses)
//deleteCourse
router.delete('/deleteCourse', auth , isInstructor , deleteCourse)
//getting fullCourseDetail
router.get("/getFullCourseDetails",getFullCourseDetails);
//add wishlist
router.post("/addWislist",auth,isStudent,addWishlist);
//get all wishlist courses
router.get("/getAllWishlistCourses",auth,isStudent,getAllWishlistCourses);
//remove wishlist
router.put("/removeWishList",auth,isStudent,removeWishList);
//get all enrolled courses
router.get("/allEnrolledCourses",auth,isStudent,allEnrolledCourses);
//addCourseToUserPayment in Student Dashboard
router.post("/enrollCourse",auth, isStudent , enrollCourses);
//get the user enrolled courses
router.get("/getEnrolledCourses",auth , isStudent , allEnrolledCourses);
//detailedEnrolledeachCourse
router.get("/getDetailedEnrolledCourse",auth , isStudent , getDetailedEnrolledCourse);



//                                      Category routes (Only by Admin)

// Category can Only be Created by Admin
router.post("/createCategory", auth, isAdmin, createCategory)
router.get("/showAllCategories", showAllCategories)
router.get("/getCategoryPageDetails", categoryPageDetails)


//                                      Rating and Review

router.post("/createRating", auth, isStudent, createRating)
router.get("/getAverageRating", getAverageRating)
router.get("/getReviews", getAllRating)

//                                       Forum
router.post("/:courseId/createQuestion",auth,isStudent,createQuestion)
router.post("/question/createAnswer",auth,isStudent,createAnswer)
router.get("/:courseId/questions",auth,isStudent,getAllQuestions)

//                                     likingCourse
router.post("../answers/:answerId/like",auth,isStudent,likingAnswer);


module.exports = router