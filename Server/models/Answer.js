const mongoose=require("mongoose");

const answerSchema =new mongoose.Schema({
    answer:{
        type:String
    },
    answeredBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
//     likes: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User' 
//     }
//    ],
    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports=mongoose.model("Answer",answerSchema);