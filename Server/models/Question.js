const mongoose =require("mongoose");

const questionSchema = new mongoose.Schema({
    question:String,
    askedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    answeredBy:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Answer"
    }],
    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports=mongoose.model("Question",questionSchema);