// Controllers --->  1.)createSubSection  2.)deleteSubSection   3.)updateSubSection
const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const {uploadFileToCloudinary}=require("../utils/fileUploader");
require("dotenv").config();
//createSubSection
exports.createSubSection = async(req,res)=>{
    try {
        
        //fetching  the data from the request body
        const { sectionId, title, description } = req.body
        const video = req.files.video

         // Check if all necessary fields are provided
        if (!sectionId || !title || !description || !video) {
            return res
              .status(404)
              .json({ success: false, message: "All Fields are Required" })
        }

        //upload video to cloudinary and get the secure_url
        const uploadDetails=await uploadFileToCloudinary(video,process.env.FOLDER_NAME);
        
        //converting videoDuration
        function convertDurationToHMS(duration) {
          // Get total seconds from duration
          const totalSeconds = Math.floor(duration);
      
          // Calculate hours, minutes, and seconds
          const hours = Math.floor(totalSeconds / 3600);
          const minutes = Math.floor((totalSeconds % 3600) / 60);
          const seconds = totalSeconds % 60;
      
          // Create an array to hold non-zero time parts
          const timeParts = [];
      
          // Push non-zero parts into the array
          if (hours > 0) {
              timeParts.push(`${hours}hr`);
          }
          if (minutes > 0) {
              timeParts.push(`${minutes}min`);
          }
          if (seconds > 0) {
              timeParts.push(`${seconds}sec`);
          }
      
          // Return the formatted string or "0sec" if no parts are added
          return timeParts.length > 0 ? timeParts.join(' ') : '0sec';
      }
      
      
      const duration = convertDurationToHMS(uploadDetails.duration);

        
        // Create a new sub-section with the necessary information
        const SubSectionDetails = await SubSection.create({
            title: title,
            timeDuration: duration,
            description: description,
            videoUrl: uploadDetails.secure_url,
          })
  
        // Update the corresponding section with the newly created sub-section
        const updatedSection = await Section.findByIdAndUpdate(
            { _id: sectionId },
            { $push: { subSection: SubSectionDetails._id } },
            { new: true }
          ).populate("subSection")
  
    //returning the response
        return res.status(200).json({
            success:true,
            message:"SubSection is Successfully created",
            data:updatedSection
        })                                                     
 


    } catch (error) {
        return res.status(500).json({
            success:false,
            error:error.message,
            message:"Error in Subsection creation"
            
        })
    }
}

//updatingSubSection
exports.updateSubSection = async(req,res)=>{
    try {
        const { sectionId, subSectionId, title ,description } = req.body
        const subSection = await SubSection.findById(subSectionId)
        // console.log("sectionId",sectionId);
        // console.log("subSectionId",subSectionId);
        // console.log("title",title);
        // console.log("desc",description);
           console.log("SubSection",subSection);
        if (!subSectionId) {
          return res.status(404).json({
            success: false,
            message: "SubSection not found",
          })
        }
    
        if (title !== undefined) {
          subSection.title = title
        }
    
        if (description !== undefined) {
          subSection.description = description
        }
        if (req.files && req.files.video !== undefined) {
            const video = req.files.video
            const uploadDetails = await uploadFileToCloudinary(
              video,
              process.env.FOLDER_NAME
            )
            
            function convertDurationToHMS(duration) {
              // Get total seconds from duration
              const totalSeconds = Math.floor(duration);
          
              // Calculate hours, minutes, and seconds
              const hours = Math.floor(totalSeconds / 3600);
              const minutes = Math.floor((totalSeconds % 3600) / 60);
              const seconds = totalSeconds % 60;
          
              // Return as a formatted string
              return `${hours}hr ${minutes}min ${seconds}sec`;
            }
          
            const duration = convertDurationToHMS(uploadDetails.duration);    
  
            subSection.timeDuration = duration
            subSection.videoUrl = uploadDetails.secure_url;

          }

          await subSection.save()

        // find updated section and return it
         const updatedSection = await Section.findById(sectionId).populate(
           "subSection"
         )
     
         console.log("updated section", updatedSection)
     
         return res.status(200).json({
           success: true,
           message: "Section updated successfully",
           data: updatedSection,
         })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Error in updating the SubSection",
            error:error.message
        })
    }
}

//deleting the subsection
exports.deleteSubSection = async (req, res) => {
    try {
      const { subSectionId, sectionId } = req.body
      await Section.findByIdAndUpdate(
        { _id: sectionId },
        {
          $pull: {
            subSection: subSectionId,
          },
        }
      )
      const subSection = await SubSection.findByIdAndDelete({ _id: subSectionId })
  
      if (!subSection) {
        return res
          .status(404)
          .json({ success: false, message: "SubSection not found" })
      }
  
      // find updated section and return it
      const updatedSection = await Section.findById(sectionId).populate(
        "subSection"
      )
  
      return res.json({
        success: true,
        message: "SubSection deleted successfully",
        data: updatedSection,
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "An error occurred while deleting the SubSection",
      })
    }
  }