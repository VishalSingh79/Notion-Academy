//controllers  =====> 1.)createCourse   2.)getAllCourses  3.)getAll CourseDetails
const mongoose = require("mongoose");
const User = require("../models/User");
const Course=require("../models/Course");
const {uploadFileToCloudinary}=require("../utils/fileUploader");
const Category=require("../models/Category");
require("dotenv").config();
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
//createCourse Handler FUnction

exports.createCourse =async (req,res)=>{
    try {
        //fetching the data 
       
        const {courseName,courseDescription,whatYouWillLearn,price,category,instructions}=req.body;
        
        //fetching the thumbnail
        const thumbnail = req.files.thumbnail;
        
        //validation
       
        if(!courseName || !courseDescription || !price || !whatYouWillLearn || !category || !thumbnail){
            return res.status(400).json({
                success:false,
                message:"All fields are mandatory"
            })
        }

        //instructor detail for the course schema
        const userId = req.user.id;
        const intructorDetails = await User.findById(userId);
    

        if(!intructorDetails){
            return res.status(400).json({
                success:false,
                message:"Instructor details not found"
            })
        }

        // Check if the given category is valid or not
        const categoryDetails = await Category.findOne({ name: category });
        console.log(categoryDetails);
        
        if (!categoryDetails) {
            return res.status(400).json({
                success: false,
                message: "Category details not found"
            });
        }
       

        //uploading the image to cloudinary
        const thumbnailDetails=await uploadFileToCloudinary(thumbnail,process.env.FOLDER_NAME);
        
        //create an Entry for new Course
        const newCourse = await Course.create({
                              courseName,
                              courseDescription,
                              whatYouWillLearn,
                              instructor:intructorDetails._id,
                              price,
                              category : categoryDetails.name,
                              thumbnail:thumbnailDetails.secure_url,
                              status:"Draft" ,
                              instructions                                      
                              })
                              
        console.log("HIi there")
        //Add the new course to the USer Schema of Instructor
        await User.findByIdAndUpdate(
                                     {_id:intructorDetails._id},
                                     {$push:{courses:newCourse._id}},
                                     {new:true}
                                     ) ;
                                 
        //update the category schema
        await Category.findOneAndUpdate({name:category},{$push:{courses:newCourse._id}},{new:true})                             
                             
        //return the response
        
        return res.status(200).json({
            success:true,
            message:"Course is created Successfully",
            course:newCourse
        })


    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Something went wrong in the createCourse handeler",
            error:error.message
        })
    }
}

exports.editCourse = async (req, res) => {
  try {
    // Log the request body for debugging
    console.log("Request Body:", req.body);

    // Destructure and validate courseId
    const { courseId } = req.body;
    if (!courseId) {
      return res.status(400).json({ error: "courseId is required" });
    }

    // Validate if the courseId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ error: "Invalid courseId" });
    }

    // Find the course by id
    const course = await Course.findById(courseId);
    console.log("Server Course >", course);
    
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // If Thumbnail Image is found, update it
    if (req.files && req.files.thumbnailImage) {
      console.log("Thumbnail update");
      const thumbnail = req.files.thumbnailImage;
      const thumbnailImage = await uploadFileToCloudinary(thumbnail, process.env.FOLDER_NAME);
      course.thumbnail = thumbnailImage.secure_url;
    }

    // Update only the fields that are present in the request body
    const updates = req.body;
    for (const key in updates) {
      if (updates.hasOwnProperty(key)) {
        course[key] = updates[key];
      }
    }

    // Save the course
    await course.save();

    // Fetch updated course with population
    const updatedCourse = await Course.findOne({ _id: courseId })
      .populate({
        path: "instructor",
        populate: { path: "additionalDetails" },
      })
      .populate("category")
      .populate("ratingsAndReviews")
      .populate({
        path: "courseContent",
        populate: { path: "subSection" },
      })
      .exec();

    res.json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};


//getall courses handeler function
exports.getAllCourses = async(req,res)=>{
    try {
         const allCourses = await Course.find({}).populate("instructor").exec();

        return res.status(200).json({
            success:false,
            message:"All Courses are fetched Successfully",
            allCourses:allCourses
        })


    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Error in fetching all the courses"
        })
    }
}

//getCourseDetails
exports.getCourseDetails = async(req,res)=>{
    try {
        //fetching the courseID;
        const {courseId} =req.body;

        if(!courseId){
            return res.status(400).json({
                success:false,
                message:"CourseId is Missing"
            })
        }
        
        //fetch the courseDetail corresponding to the courseId
        const courseDetails =await Course.findById(courseId)
                                         .populate({
                                           path: "instructor",
                                           populate:{
                                            path:"additionalDetails",
                                           },
                                          })
                                          .populate({
                                            path: "courseContent",
                                            populate:{
                                             path:"subSection",
                                            },
                                           })
                                       //  .populate("ratingsAndReviews")
                                         .populate("category")
                                         .exec();
        console.log("Hiii...");
      //validating                                    
      if(!courseDetails){
        return res.status(400).json({
            success:false,
            message:"Could not find the Course"
        })
      }
      return res.status(200).json({
        success:true,
        message:"Course Details fetched Successfully",
        courseDetails:courseDetails
     })



    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Error while fetching the courseDetails",
            error:error
        })
    }
}


exports.getFullCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.query
    console.log("courseID }:",courseId);
  //  const userId = req.user.id
    const courseDetails = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingsAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec()

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find course with id: ${courseId}`,
      })
    }

    if (courseDetails.status === "Draft") {
      return res.status(403).json({
        success: false,
        message: `Accessing a draft course is forbidden`,
      });
    }

    
    return res.status(200).json({
      success: true,
      data: {
        courseDetails,
      },
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// Get a list of Course for a given Instructor
exports.getInstructorCourses = async (req, res) => {
  try {
    // Get the instructor ID from the authenticated user or request body
    const instructorId = req.user.id
    console.log(instructorId);
    // Find all courses belonging to the instructor
    const instructorCourses = await Course.find({
              instructor: instructorId,
              })
              .sort({ createdAt: -1 })
              .populate({
                path: 'courseContent',
                populate: {
                  path: 'subSection',
                },
              });

    // Return the instructor's courses
    res.status(200).json({
      success: true,
      data: instructorCourses,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Failed to retrieve instructor courses",
      error: error.message,
    })
  }
}
// Delete the Course
exports.deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.body

    // Find the course
    const course = await Course.findById(courseId)
    if (!course) {
      return res.status(404).json({ message: "Course not found" })
    }

    // Unenroll students from the course
    const studentsEnrolled = course.studentsEnrolled
    for (const studentId of studentsEnrolled) {
      await User.findByIdAndUpdate(studentId, {
        $pull: { courses: courseId },
      })
    }

    // Delete sections and sub-sections
    const courseSections = course.courseContent
    for (const sectionId of courseSections) {
      // Delete sub-sections of the section
      const section = await Section.findById(sectionId)
      if (section) {
        const subSections = section.subSection
        for (const subSectionId of subSections) {
          await SubSection.findByIdAndDelete(subSectionId)
        }
      }

      // Delete the section
      await Section.findByIdAndDelete(sectionId)
    }

    // Delete the course
    await Course.findByIdAndDelete(courseId)

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
}

exports.addWishlist = async (req, res) => {
  try {
    const { courseId } = req.body;
    console.log("courseId -> ",courseId);
    if (!courseId) {
      return res.status(400).json({ error: "Course ID is required" });
    }

    // Find the user
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the course is already in the wishlist
    if (user.wishlistCourses.includes(courseId)) {
      return res.status(200).json({ 
        success:true,
        message: "Course already in wishlist" });
    }


    // Add the course to the wishlist
    user.wishlistCourses.push(courseId);
    await user.save();

    return res.status(200).json({ success: true, message: "Course added to wishlist" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ 
      success: false,
      message: error.message,
      error: "Server error" });
  }
}

exports.getAllWishlistCourses = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
                                                .populate("wishlistCourses");    

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
   // const wishlistCourses = user.wishlistCourses;
    return res.status(200).json({ 
      success: true, 
      data:user,
      
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ 
      error: "Server error",
      message: error.message
     });
  }
}


exports.removeWishList = async (req, res) => {
  try {
    const { courseId } = req.body;

    if (!courseId) {
      return res.status(400).json({ error: "Course ID is required" });
    }

    // Find the user
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Remove the course from the wishlist
    user.wishlistCourses = user.wishlistCourses.filter((course) => course.toString() !== courseId);

    // Save the updated user document
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Course removed from wishlist",
      data: user
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: "Server error",
      message: error.message
    });
  }
};

exports.allEnrolledCourses = async (req, res) => {  
  try {
    const user = await User.findById(req.user.id).populate("enrolledCourses");
    if (!user) {
      return res.status(404).json(
        {
           success:false,
           error: "User not found" 
        });
    }
    const enrolledCourses = user.enrolledCourses;
    return res.status(200).json({ 
      success: true, 
      data:enrolledCourses
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ 
      success:false,
      error: "Server error",
      message: error.message
     });
  }
}

exports.getDetailedEnrolledCourse = async (req, res) => {  
  try {
    
    const { courseId } = req.query;
    console.log("courseID",courseId);
    const userId = req.user.id;
    console.log("courseID",courseId);
    const courseData = await User.findOne({ _id: userId, 
                                            enrolledCourses: courseId 
                                          })
                                          .populate({
                                              path: 'enrolledCourses',
                                              match: { _id: courseId }, // Filters to get the specific courseId
                                              populate: {
                                                  path: 'courseContent',
                                                  populate: {
                                                      path: 'subSection',
                                                      model: 'SubSection'
                                                  }
                                              }
                                          })
    if (!courseData) {
      return res.status(404).json(
        {
           success:false,
        
           message:"Data cannot be fetched"
        });
    }
  
    // Retrieve only the matched enrolled course
    const matchedCourse = courseData.enrolledCourses.find(course => course._id.toString() === courseId);


    return res.status(200).json({ 
      success: true, 
      data:matchedCourse,
      user:courseData
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ 
      success:false,
      message: "Server error",
      error: error.message
     });
  }
}

exports.enrollCourses = async (req,res) => {
  try {
    
    const { courseId } = req.body;
    const userId = req.user.id;
    console.log("userId", courseId);
    const courseData = await User.findOneAndUpdate({ _id: userId},
                                                     { 
                                                      $push : {enrolledCourses: courseId }
                                                     },
                                                     {new:true}
                                                  )

    if (!courseData) {
      return res.status(404).json(
        {
           success:false,
           error: "Error Ocurred during enrollment!!" 
        });
    }
  
    return res.status(200).json({ 
      success: true, 
      data:courseData
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ 
      success:false,
      error: "Server error",
      message: error.message
     });
  }
}



