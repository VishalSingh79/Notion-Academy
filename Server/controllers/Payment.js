const {instance} = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const {default:mongoose} =require("mongoose");
const emailTemplate = require("../mail/templates/courseEnrollmentEmail");
const crypto = require("crypto");
require("dotenv").config();
//TODO : => MAIL TEMPLATE FOR THE COURSE-ENROLLEMENT 

//capture the payment and initiate the razorpay order
exports.capturePayment = async(req,res)=>{
    try {
        //get courseID and userID
        const {courseId} = req.body
        const userId = req.user.id;
        console.log("COURSEID",courseId);
        //valid courseId
        if(!courseId){
            return res.status(400).json({
                success:false,
                message:"Please Provide a valid Course"
            })
        }

        //validating the courseDetails
        let course;
        course = await Course.findById(courseId);
        if(!course){
            return res.status(400).json({
                success:false,
                message:"NO valid course Details"
            })
        }
        //console.log("course",course);

        //user already paid for that course or not( course ke model ke andar user object_id mai store hai so hme user ki object_id pta krni hogi user_id se )
       // const uid = mongoose.Types.ObjectId(userId);
        if(course.studentsEnrolled.includes(userId)){
            return res.status(400).json({
                success:false,
                message:"You are already Enrolled in this Course"
            })
        }
       //creating an order
       const amount = course.price;
       const currency = "INR";
       console.log("amount",amount)
       const options = {
         amount: amount *100,
         currency,
         receipt:Math.random(Date.now()).toString(),
         notes:{
            courseId :courseId,
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
            message:"Something went wrong during the payment capture",
            error:error.message
        })
    }
}

//verify signature of Razorpay and Server (matching the secret of server and the secret send by the razorpay)
exports.verifySignature = async(req,res)=>{

    const {razorpay_order_id ,razorpay_payment_id,razorpay_signature,courseId} = req.body
    
    const userId = req.user.id

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !courseId ||
      !userId
    ) {
      return res.status(200).json({ success: false, message: "Payment Failed" })
    }

    //const webhookSecret = "12345678";
    
    let body = razorpay_order_id + "|" + razorpay_payment_id
  //  const signature =req.headers("x-razorpay-signature");
    
    //hashing the webhookSecret
    const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex")

    if(expectedSignature === razorpay_signature){
        console.log("Payment is Authorised");

      //  const {courseId,userId}=req.body.payload.payment.entity.notes;
        
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
           const enrolledStudent = await User.findOneAndUpdate({_id:userId},{$push:{enrolledCourses:courseId}},{new:true});
           console.log("enrollStudent",enrolledStudent);

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
                message:"Error while payment authorisation",
                error:error.message
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