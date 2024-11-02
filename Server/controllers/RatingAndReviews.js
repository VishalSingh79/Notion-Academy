//controllers ========> 1.)Creating ratingAndReview    2.)getAverageRating     3.)getAllRating
const RatingsAndReview =require("../models/RatingsAndReviews");
const Course = require("../models/Course");
const mongoose =require("mongoose");
const User =require("../models/User");

//creating an rating and review
exports.createRating = async(req,res)=>{
    try {
        //fetching the data
        const {rating,review,courseId}=req.body;

        const userId = req.user.id;
        //checking the user is enrolled on that ourse or not 
        const courseDetail = await Course.findById(courseId);
        if(!(courseDetail.studentsEnrolled.includes(userId)))
        {
            return res.status(400).json({
                success:false,
                message:"You are not the valid User"
            })
        }

        //checking that the user already given the review to that course or not
        const givenRating = await RatingsAndReview.findOne({user:userId,course:courseId});
        if(givenRating){
            return res.status(400).json({
                success:false,
                message:"You have already given Rating"
            })
        }

        //validating the data
        if(!rating || !review){
            return res.status(400).json({
                success:false,
                message:"Data is missing"
            })
        }
        
        //creating the ratingreview in database
        const dataDetails = await RatingsAndReview.create({
                                                           user:userId,
                                                           rating:rating,
                                                           review:review,
                                                           course:courseId
                                                          });
         if(!dataDetails){
            return res.status(400).json({
                    success:false,
                    message:"Entry is not created in the Database"
                })
        }                                                     
        
        //updating the course with the reviewandrating
        const updatedCourse = await Course.findByIdAndUpdate(courseId,{$push:{ratingsAndReviews:dataDetails._id}},{new:true});

        if(!updatedCourse){
            return res.status(400).json({
                success:false,
                message:"Course is not Updated in review"
            })
        }
        
       return res.status(200).json({
        success:true,
        message:"Your review is successfully added"
       })


    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Error while creating an ratingAndReview controller"
        })
    }
}

//getAverageRating
exports.getAverageRating = async(req,res)=>{
    try {
        //get CourseId
         const {courseId}=req.body;
        //calculate Avg Rating
        const AverageRating = await RatingsAndReview.aggregate([
                                           {
                                            $match:{
                                                course: mongoose.Types.ObjectId(courseId),
                                            }
                                            },
                                            {
                                                $group:{
                                                    _id:null,
                                                    averageRating:{$avg:"rating"}
                                                }
                                            }
                                        ])

        //return res

        if(AverageRating.length>0){
              return res.status(200).json({
                success:true,
                averageRating:AverageRating
              })
        }                                
       //if no rating is given in the course
       return res.status(200).json({
         success:true,
         message:"No rating is given yet..",
         averageRating:AverageRating
       })



    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Error in the get Average Rating"
        })
    }
}



//getAllRating
exports.getAllRating = async(req,res)=>{
    try {
        //fetching all the ratings
        const allData = await RatingsAndReview.find({})
                                              .sort({rating:-1})
                                              .populate({
                                                path:"user",
                                                select:"firstName lastName email image"
                                              })
                                              .populate({
                                                path:"course",
                                                select:"courseName"
                                              })
                                              .exec();

        if(!allData){
            return res.status(400).json({
                success:false,
                message:"Error in fetching all the ratingsandReviews"
            })
        }
       
       return res.status(200).json({
        success:true,
        message:"Successfully fetched the ratingsandreviews"
       })


    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Error while getting all the ratings"
        })
    }
}