const mongoose=require("mongoose");

const courseSchema=new mongoose.Schema({
    courseName:{
        type:String,
        trim:true,
        required:true
    },
    courseDescription:{
        type:String,
        trim:true
    },
    instructor:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    whatYouWillLearn:{
        type:String,
        trim:true,
    },
    courseContent:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Section"
        }
    ],
    ratingsAndReviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"RatingsAndReviews"
        }
    ],
    price:{
        type:Number
    },
    thumbnail:{
        type:String,
    },
    category:{
        type:String,
    },
   
    studentsEnrolled:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    instructions:{
        type:String
    },
    status:{
        type:String,
        enum:["Draft","Published"]
    },
    timeDuration:{
       type:String
    },
    forum:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Question"
    }]

},{timestamps:true})

module.exports= mongoose.model("Course",courseSchema)