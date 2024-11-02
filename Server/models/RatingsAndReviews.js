const mongoose=require("mongoose");

const ratingandreviewSchema=new mongoose.Schema({
   user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    requires:true,
   },
   rating:{
    type:Number,
    required:true,
    trim:true
   },
   review:{
    type:String,
    required:true,
    trim:true
   },
   course:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Course",
      required:true,
      index:true,
   }
})

module.exports = mongoose.model("RatingsAndReviews", ratingandreviewSchema);  // Change to RatingsAndReviews
