const {instance} = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const {mailSender} = require("../utils/mailSender");
const {default:mongoose} =require("mongoose");
const emailTemplate = require("../mail/templates/courseEnrollmentEmail");

//TODO : => MAIL TEMPLATE FOR THE COURSE-ENROLLEMENT 

//capture the payment and initiate the razorpay order
exports.capturePayment = async(req,res)=>{
    try {
        //get courseID and userID
        const {course_id} = req.body
        const userId = req.user.id;

        //valid courseId
        if(!course_id){
            return res.status(400).json({
                success:false,
                message:"Please Provide a valid Course"
            })
        }

        //validating the courseDetails
        let course;
        course = await Course.findById(course_id);
        if(!course){
            return res.status(400).json({
                success:false,
                message:"NO valid course Details"
            })
        }
        
        //user already paid for that course or not( course ke model ke andar user object_id mai store hai so hme user ki object_id pta krni hogi user_id se )
        const uid = mongoose.Types.ObjectId(userId);
        if(course.studentsEnrolled.includes(uid)){
            return res.status(400).json({
                success:false,
                message:"Student is already Enrolled in this Course"
            })
        }
       //creating an order
       const amount = course.price;
       const currency = "INR";

       const options = {
         amount: amount *100,
         currency,
         receipt:Math.random(Date.now()).toString(),
         notes:{
            courseId :course_id,
            userId
         },
       };

       try {
          //initiate the payment using the razorpay
          const paymentResponse = await instance.orders.create(options);
          console.log(paymentResponse);   
          
          //return the response
          return res.status(200).json({
            success:true,
            courseName:course.courseName,
            courseDescription:course.courseContent,
            courseThumbnail:course.thumbnail,
            orderId:paymentResponse.id,
            currency:paymentResponse.currency,
            amount:paymentResponse.amount
          })

       } catch (error) {
         console.log("error in initiating the order of razorpay");
         return res.json({
            success:false,
            message:"Could not initiate the response"
         })

       }



    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Something went wrong during the payment capture"
        })
    }
}

//verify signature of Razorpay and Server (matching the secret of server and the secret send by the razorpay)
exports.verifySignature = async(req,res)=>{
    const webhookSecret = "12345678";

    const signature =req.headers("x-razorpay-signature");
    
    //hashing the webhookSecret
    const shasum = crypto.createHmac("sha256",webhookSecret);
    shasum.update(JSON.stringify(req.body));
    const digest= shasum.digest("hex");

    if(signature===digest){
        console.log("Payment is Authorised");

        const {courseId,userId}=req.body.payload.payment.entity.notes;
        
        try {
            //fulfill the Action now
            
            //find the course and enroll the student in it
            const enrolledCourse = await Course.findOneAndUpdate({_id:courseId},{$push:{studentsEnrolled:userId}},{new:true});
            if(!enrolledCourse){
                return res.status(400).json({
                    success:false,
                    message:"Something want wrong in the enrolledCourses"
                })
            }
            

            //find the student and enter the course id in the courses array of student
           const enrolledStudent = await User.findOneAndUpdate({_id:userId},{$push:{courses:courseId}},{new:true});


           if(!enrolledStudent){
            return res.status(400).json({
                success:false,
                message:"Something want wrong in the enrolledCourses in enrolled Student"
            })
        }
  

           //sending the course enrollment mail to the user
           const emailResponse = await mailSender(enrolledStudent.email,"Congratulations from Notion Academy",emailTemplate.courseEnrollmentEmail(enrolledCourse.courseName,`${enrolledStudent.firstName} ${enrolledStudent.lastName}`));

           //sending the response
           return res.status(200).json({
            success:true,
            message:"Signature verified and Course addded"
           })


        } catch (error) {
            return res.status(400).json({
                success:false,
                message:"Error while payment authorisation"
            })
        }

    }
    else{
        return res.status(500).json({
            success:false,
            message:"Invalid Request"
        })
    }


}