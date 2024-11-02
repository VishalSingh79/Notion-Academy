//   1.)resetPassword                       2.)resetPasswordToken
const User = require("../models/User");
const jwt=require("jsonwebtoken");
const mailSender=require("../utils/mailSender");
const bcrypt=require("bcrypt");
const emailTemplate = require("../mail/templates/passwordUpdate");
const crypto = require("crypto");

require("dotenv").config();

//resetPassword Token(generating the token after that generating the url then after sending the url to the email)
exports.resetPasswordToken = async(req,res)=>{
    try {
        //fetching the email from the userDetails.firstName
      const {email}=req.body;

        //validating the mail
        const isExist =await User.findOne({email:email});
        
        if(!isExist){
            return res.status(400).json({
                success:false,
                message:"You are not the registered User"
            })
        }
        
        //generating the token
        const token=crypto.randomUUID();
        
        //creating the url// frontend URL
        const url =`https://notion-academy.vercel.app//update-password/${token}`;
        
        const firstname = isExist.firstName;
        const lastname = isExist.lastName; 
        const name = `${firstname} ${lastname}`
        console.log(name);
        //sending the mail with the url
       const response= await mailSender(email,"Password Reset Mail | Notion Academy ",` <a href=${url} target="_blank">Click Here</a> to reset your password `); 
        
        //Updating the user by adding token and expiration time

        const updateDetails = await User.findOneAndUpdate(
            {email:email},
            {
                token:token,
                resetPasswordExpires:Date.now() + 5*60*1000
            },{new:true});
            console.log(updateDetails);
        //return the response
        return res.status(200).json({
            success:true,
            message:"Email is sent ,click on the link then reset the password",
            token:token
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Somethinig went wrong while sending the url to the mail"
        })
    }
}

//                                 resetPassword
exports.resetPassword = async(req,res)=>{
    try {
         //fetching the data from the request//token are given by the frontend
         const {password,confirmPassword,token}=req.body;
         
         
         console.log("token: ",token);
         console.log("password: ",password);


         //validating the passoword
         if(password!==confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Password does not matches"
            })
         }

         //gettign the userDetails from the databse using the token
         const userDetails = await User.findOne({token:token});
         const email =userDetails.email;
         const fname = userDetails.firstName;
         const sname = userDetails.lastName

         const name = `${fname} ${sname}`;

        if(!userDetails){
            return res.status(400).json({
                success:false,
                message:"User is not Registered"
            })
        }
        //Checking token time 
    
        if(userDetails.resetPasswordExpires < Date.now()){
            return res.json({
                success:false,
                message:"Your token is Expired, Please click on the Forgot Password again"
            })
        }

        //hashing the password
        const hashPassword=await bcrypt.hash(password,10);

        //updating  the password in the database
        const updateDetails=await User.findOneAndUpdate({token:token},{password:hashPassword},{new:true});
        
        if(!updateDetails){
            return res.status(400).json({
                success:false,
                message:"Failed to update in the database"
            })
        }
   
         //sending the mail with the url
         await mailSender(email,"Reset Password Successfully!! | Notion Academy",emailTemplate.passwordUpdated(email,name));

         console.log(name);
        //return the response 
        return res.status(200).json({
            success:true,
            message:"Your Password is Successfully reset",
            data:updateDetails
        })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Something went wrong while reseting the password",
            error:error.message
        })
    }
}