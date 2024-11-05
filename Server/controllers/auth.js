//               1.)otp-generation    2.)signUp       3.)login       4.)changePassword

const User=require("../models/User");
const OTP=require("../models/OTP");
const otpGenerator=require("otp-generator");
const bcrypt=require("bcrypt");
const Profile=require("../models/Profile");
const jwt = require("jsonwebtoken");
const mailSender=require("../utils/mailSender")
const emailTemplate = require("../mail/templates/passwordUpdate");
const Category = require("../models/Category");


require("dotenv").config();

                                            //otp generation

exports.sendotp=async(req,res)=>{
  try {
         //fetch email from req.body
         const {email}=req.body;
 
         //checking if user already exist or not
         const isExist=await User.findOne({email});

         if(isExist){
            return res.status(409).json({
            success:false,
            message:"User already Registered"
            })
        }

        //generate otp
        var otp= otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false
        })

        //checking an otp is unique or not
        
        const uniqueOtp = await OTP.findOne({otp:otp});

        //generating the otp until we get an unique otp
        while(uniqueOtp){
            otp=otpGenerator.generate(6,{
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false
            })

            uniqueOtp = await OTP.findOne({otp:otp});
        }

        //creating a entry in your database
        
         const otpBody=await OTP.create({
            email,
            otp
         })
         
         res.status(200).json({
            success:true,
            message:"Successfully send an otp",
            otp:otpBody,
         })


  } catch (error) {
     res.status(500).json({
        success:false,
        message:"Error while sending otp"
     })
  }
   
}

                                            //signup

exports.signup = async (req, res) => {
    try {
        const { firstName, lastName, email, password, confirmPassword, accountType, otp } = req.body;

        if (!firstName || !lastName || !email || !password || !confirmPassword || !otp) {
            return res.status(403).json({
                success: false,
                message: "All fields are required"
            });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Password and Confirm password do not match"
            });
        }

        const isUserExist = await User.findOne({ email });
        if (isUserExist) {
            return res.status(400).json({
                success: false,
                message: "User is already Registered. Please sign in to continue.."
            });
        }

        const recentOtp = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);

        // Ensure recentOtp is found and contains data
        if (!recentOtp || recentOtp.length === 0) {
            return res.status(400).json({
                success: false,
                message: "OTP not found"
            });
        }

        if (otp !== recentOtp[0].otp) {
            return res.status(400).json({
                success: false,
                message: "OTP does not match"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const profileDetails = await Profile.create({
            dateOfBirth: null,
            about: null,
            gender: null,
            contactNumber: null
        });
        
        const courseName = await Category.findOne({ name: "Web  Development" });
        if(courseName.courses.length>0){
           const courseId = courseName.courses[0]._id;
        }
        const createEntry = await User.create({
            firstName,
            lastName,
            password: hashedPassword,
            email,
            accountType,
            enrolledCourses:[courseId],
            additionalDetails: profileDetails._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
        });
        
        return res.status(200).json({
            success: true,
            message: "Your Account is created in our database",
            response: createEntry
        });

    } catch (error) {
        console.error("Signup error: ", error); // Log the error for better debugging
        return res.status(500).json({
            success: false,
            message: "Error while signing up"
        });
    }
};




                                            //login

exports.login = async (req,res)=>{
    try {
        //fetching the data from the request body
        const {email,password}=req.body;

        //validating the user
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"Fill the login form carefully"
            })
        }
        //checking user exist in our database or not
        const user= await User.findOne({email}).populate('additionalDetails');

        if(!user){
            return res.status(400).json({
                success:false,
                message:"You are not a registered User. Please Signup first"
            })
        }

        //Matching the password
        const matched = await bcrypt.compare(password,user.password);

        if(!matched){
            return res.status(400).json({
                success:false,
                message:"Password is incorrect"
            })
        }

        //generating the JWT
        const payload={
            id:user._id,
            firstName:user.firstName,
            lastName:user.lastName,
            email:user.email,
            accountType:user.accountType,        
        }

        let token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"72h"});
        
        user.token=token;
        user.password=undefined;

        //create cookie and send response
        const options = {
            expires: new Date(Date.now()+ 3*24*60*60*1000),
            httpOnly:true
        }
        res.cookie("token",token,options).status(200).json({
            success:true,
            message:"Logged In successfully",
            data:token,
            user:user,
            type:user.accountType,
            image:user.image
        })

    } catch (error) {
        conssole.log("Error in logging ", error);
        return res.status(500).json({
            success:false,
            message:"Loggin failed, Please try again"
        })
    }
}

                                        //change password

// exports.changePassword = async(req,res)=>{
//     try {
//         //fetching the data from the request body
//         const {oldPassword,newPassword,confirmPassword}=req.body;
        
//         //performing the validation 
//         if(!oldPassword || !newPassword || !confirmPassword){

//             return res.status(400).json({
//                 success:false,
//                 message:"Please fill all the fields carefully"
//             })
//         }

//         //Extracting the email from the token, so that  when the user gives the oldPassword we can verify that it is correct or not
        
//         const token = req.body.token || req.cookies.token || req.header("Authorization").replace("Bearer ","");

//         // Check if token exists
//         if (!token) {
//             return res.status(401).json({
//                 success: false,
//                 message: "No token found, Please log in"
//             });
//         }
      
//         const payload = jwt.verify(token,process.env.JWT_SECRET);
//         const userEmail = payload.email;
//         console.log(userEmail);
//         const user = await User.findOne({email:userEmail});
//         console.log(user.password);
//         const matched= await bcrypt.compare(oldPassword,user.password);
//         console.log(matched);

//         if(!matched){
//             console.log("Please Enter your correct current password");
//             return res.status(400).json({
//                 success:false,
//                 message:"current Password is incorrect"
//             })
//         }

//         //Now matching both the newPassword and confirmPassword is same or not
//         if(newPassword!==confirmPassword){
//             return res.status(400).json({
//                 success:false,
//                 message:"newPassword and confirmPassword are not same"
//             })
//         }
//         //hashing the password then saving the hashed password

//         const hashedPassword = await bcrypt.hash(newPassword,10);
//        console.log("Password is hashed!!");
//         //updating the Password into the database
//         const userUpdated = await User.findByIdAndUpdate({_id:user._id},{password:hashedPassword},{new:true});

//         if(!userUpdated){
//             return res.status(500).json({
//                 success:false,
//                 message:"Failed to update password"
//             })
//         }
//         const fname = userUpdated.firstName;
//         const sname = userUpdated.lastName

//         const name = `${fname} ${sname}`;

//         const emailResponse= await mailSender(user.email,"Password changed Successfully!! | Notion Academy",emailTemplate.passwordUpdated(email,name));
        
//         return res.satus(200).json({
//             success:true,
//             message:"Password is changed Successfully"
//         })


//     } catch (error) {
//         console.log("Error in changing the password", error);
//         return res.status(500).json({
//             success:false,
//             message:"Change Password Failed.."
//         })
//     }
// }

exports.changePassword = async (req, res) => {
    try {
      // fetching the data from the request body
      const { oldPassword, newPassword, confirmPassword } = req.body;
  
      // performing the validation
      if (!oldPassword || !newPassword || !confirmPassword) {
        return res.status(400).json({
          success: false,
          message: "Please fill all the fields carefully",
        });
      }
  
      // Extracting the token
      const token = req.body.token || req.cookies.token || req.header("Authorization").replace("Bearer ", "");
      
      if (!token) {
        return res.status(401).json({
          success: false,
          message: "No token found, Please log in",
        });
      }
  
      // Verify token and extract email
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      const userEmail = payload.email;
      
      // Fetch the user from the database
      const user = await User.findOne({ email: userEmail });
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
  
      // Debugging: log hashed password from DB and the entered old password
      console.log("Old password entered by user:", oldPassword);
      console.log("Hashed password from database:", user.password);
  
      // Check if old password matches the one in the database
      const matched = await bcrypt.compare(oldPassword, user.password);
  
      // Debugging: Log the comparison result
      console.log("Password match result:", matched);
  
      if (!matched) {
        return res.status(400).json({
          success: false,
          message: "Current password is incorrect",
        });
      }
  
      // Now matching both the newPassword and confirmPassword
      if (newPassword !== confirmPassword) {
        return res.status(400).json({
          success: false,
          message: "New password and confirm password do not match",
        });
      }
  
      // Hashing the new password and saving it
      const hashedPassword = await bcrypt.hash(newPassword, 10);
  
      // Updating the password in the database
      const userUpdated = await User.findByIdAndUpdate(
        { _id: user._id },
        { password: hashedPassword },
        { new: true }
      );
  
      if (!userUpdated) {
        return res.status(500).json({
          success: false,
          message: "Failed to update password",
        });
      }
  
      // Send confirmation email
      const fullName = `${userUpdated.firstName} ${userUpdated.lastName}`;
      const emailResponse = await mailSender(
        user.email,
        "Password changed successfully! | Notion Academy",
        emailTemplate.passwordUpdated(user.email, fullName)
      );
  
      // Respond to the user
      return res.status(200).json({
        success: true,
        message: "Password changed successfully",
      });
  
    } catch (error) {
      console.log("Error in changing the password", error);
      return res.status(500).json({
        success: false,
        message: "Failed to change password",
      });
    }
  };
  

