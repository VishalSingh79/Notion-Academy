// controller   ====>  1.)likingAnswer   2.)sending the mailto Top 5 Answeres
const {mailSender} = require("../utils/mailSender");
const Answer =require("../models/Answer");
const cron = require('node-cron');
const User =require("../models/User");

exports.likingAnswer =async(req,res)=>{
    try {
         //fetching the answerId
         const {answerId}=req.params;
         //validating 
         if(!answerId){
            res.status(400).json({
                success:false,
                message:"data is not found"
            })
         }
         const userId = req.user.id;
         
         const answer = await Answer.findById(answerId);
         // Check if the user already liked the answer
         const index = answer.likes.indexOf(userId);

         if (index === -1) {
         // If not liked, add the user's ID to the likes array
         const response= await Answer.findByIdAndUpdate(answerId,{
            $push:{likes:userId}
             },
             {new:true});

         if(!response){
                res.status(400).json({
                    success:false,
                    message:"Error in creating an entry in the database"
                })
         }
       

         }


    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:"Error in liking the course"
        })
    }
}

//fetching the top 5 solvers from the course
const getTopSolversForAllCourses = async () => {
    try {
      const topSolvers = await Answer.aggregate([
        { $unwind: '$likes' }, 
        { $group: { 
            _id: { course: '$course', answeredBy: '$answeredBy' }, 
            likeCount: { $sum: 1 } 
        } },
        { $sort: { '_id.course': 1, likeCount: -1 } }, 
        { $group: {
            _id: '$_id.course', 
            topSolvers: { $push: { userId: '$_id.answeredBy', likeCount: '$likeCount' } } 
        } },
        { $project: {
            _id: 1,
            topSolvers: { $slice: ['$topSolvers', 5] } 
        } }
      ]);
  
      return topSolvers;
    } catch (error) {
      console.error('Error fetching top solvers:', error);
      throw new Error('Error fetching top solvers');
    }
  };

//sending mail to top solvers
const sendWeeklyTopSolverEmails = async () => {
    try {
      const topSolversByCourse = await getTopSolversForAllCourses();
      
      for (const course of topSolversByCourse) {
        // Fetch course details
        const courseDetails = await Course.findById(course._id).lean();
  
        // Fetch user details for the top solvers
        const userIds = course.topSolvers.map(solver => solver.userId);
        const users = await User.find({ _id: { $in: userIds } });
  
        // Prepare email content
        const emailContent = users.map((user, index) => `
          ${index + 1}. ${user.name} - ${course.topSolvers[index].likeCount} likes
        `).join('\n');
  
        // Send email to each top solver
        for (const user of users) {
          const emailText = `
            Hi ${user.name},
  
            Congratulations! You are one of the top solvers for the course "${courseDetails.courseName}" this week.
            Keep up the great work!.

            Best Regards,
            Notion Academy Team
          `;
  
          // Use nodemailer to send the email
          await mailSender(user.email,`Top Solvers for ${courseDetails.courseName}`,emailText);
          
          console.log("Mail Send to top Solvers");
        }
      }
  
    } catch (error) {
      console.error('Error sending weekly top solver emails:', error);
    }
  };

  
//Runnig a cron job at 9AM of Sunday
cron.schedule('0 9 * * SUN',async () => {
    console.log('Running weekly top solver email job...');
    sendWeeklyTopSolverEmails();
  });
  
