const mongoose=require("mongoose");

const profile= new mongoose.Schema({
    dateOfBirth:{
        type:String,
    },
    gender:{
        type:String
    },
    about:{
        type:String,
        trim:true
    },
    contactNumber:{
        type:Number,
        trim:true,
    }
})

module.exports=mongoose.model("Profile",profile);