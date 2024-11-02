const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true
    },
    lastName:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true,
    },
    accountType:{
        type:String,
        required:true,
        enum:["Admin","Student","Instructor"]
    },
    contactNumber:{
        type:Number,
        trim:true 
    },
    active:{
       type:Boolean,
       default:true,
    },
    approved:{
        type:Boolean,
        default:true,
     },
    additionalDetails:{
        type:mongoose.Schema.Types.ObjectId,  
        ref:"Profile"
    },
    token:{
        type:String,
    },
    resetPasswordExpires:{
       type:Date,
    },
    courses:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Course"
        }
    ],
    wishlistCourses :[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Course"
        }
    ],
    image:{
        type:String,
        required:true
    },
    enrolledCourses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course",
    }],
    courseProgess:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"CourseProgress"
    }

},{timestamps:true})

module.exports=mongoose.model("User",userSchema);