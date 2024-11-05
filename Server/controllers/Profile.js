//controllers ---> 1.)updateProfile    2.)deleteAccount   3.)getAllUserDetails

const Profile = require("../models/Profile");
const User = require("../models/User");
const {uploadFileToCloudinary} =require("../utils/fileUploader");


exports.updateProfile = async(req,res)=>{
    try {
        //fetching the data
        const {dateOfBirth="",gender,about="",contactNumber}=req.body;
        //fething the userId
        const userId= req.user.id;
        //validating the data
        if(!gender || !userId){
            return res.status(400).json({
                success:false,
                message:"Missing some Properties"
            })
        }

        //finding the userDetails
        const userDetails = await User.findById(userId);

        //finding the profile the profileId
        const profileId = userDetails.additionalDetails;

        //finding the profiedetails

        const profileUpdatedDetails= await Profile.findByIdAndUpdate(profileId,
                                                                    {
                                                                        dateOfBirth,
                                                                        gender,
                                                                        about,
                                                                        contactNumber
                                                                    },{new:true});
        
        const updatedUser = await User.findByIdAndUpdate(
           { _id: userId },
           { additionalDetails: profileUpdatedDetails._id }, // Updating the reference with updated _id
           { new: true }
        ).populate('additionalDetails');


        return res.status(200).json({
            success:true,
            message:"Profile Details Updated Successfully",
            user:updatedUser
        })


    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Error while updating the profile"
        })
    }
}

//TODO: TaskScheduling ...?
//TODO: Cronjob...? 

//deleteAccount
exports.deleteAccount = async(req,res)=>{
    try {
        //get the user id
        const id=req.user.id;
        console.log("HIIO");
        //validate that the user Exist or not
        const userDetails = await User.findById(id);
        console.log(userDetails);
        if(!userDetails){
            return res.status(404).json({
                success:false,
                message:"User does not found"
            })
        }

        //delete the profile
        await Profile.findByIdAndDelete(userDetails.additionalDetails);
        //TODO:  delete enrolled user from all enrolled courses
        //TODO:  we should delete the instructor created course and student paid course or not.?
       //deleting the User
       await User.findByIdAndDelete(id);
       
       
       //return the response
       return res.status(200).json({
        success:true,
        message:"Account is successfully deleted"
       })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Error in deleting the Account",
            error:error.message
        })
    }
}

//getAllUsersDetails
exports.getAllUserDetails = async(req,res)=>{
    try {
         //getting the id of user
         const id = req.user.id;
         //validating the user Details
         const userDetails = await User.findById(id).populate("additionalDetails").exec();

         if(!userDetails){
             return res.status(400).json({
                success:false,
                message:"No user Found"
             })
         }

         return res.status(200).json({
            success:true,
            message:"User Data Fetched successfully",
            data:userDetails
         })


        } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Error  while fetching All user Details"
        })
    }
}

//update Profile Picture
exports.updateDisplayPicture = async (req, res) => {
    try {
      const displayPicture = req.files.displayPicture;
      const userId = req.user.id;
      console.log("User id -> ",userId);
      const image = await uploadFileToCloudinary(
        displayPicture,
        process.env.FOLDER_NAME,
        1000,
        1000
      )
      console.log(image);
      const updatedProfile = await User.findByIdAndUpdate(
        { _id: userId },
        { image: image.secure_url },
        { new: true }
      )
      .populate("additionalDetails")
      .exec();

      res.send({
        success: true,
        message: `Image Updated successfully`,
        data: updatedProfile,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};
  
exports.getEnrolledCourses = async (req, res) => {
    try {
      const userId = req.user.id
      const userDetails = await User.findOne({
        _id: userId,
      })
        .populate("courses")
        .exec()
      if (!userDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find user with id: ${userDetails}`,
        })
      }
      return res.status(200).json({
        success: true,
        data: userDetails.courses,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};