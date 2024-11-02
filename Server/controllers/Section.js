//controllers  --->  1.)createSection   2.)updateSection    3.)deleteSection
const Section = require("../models/Section");
const Course = require("../models/Course");
const SubSection = require("../models/SubSection");
//createSection
exports.createSection = async(req,res)=>{
    try {
        //fetch the data from the req body
        const {sectionName,courseId}=req.body;

        //validating the data
        if(!sectionName || !courseId){
            return res.status(400).json({
                success:false,
                message:"data is not filled"
            })
        }
        //creating a entry of section in the database
        const newSection = await Section.create({
                                                     sectionName,
                                                    })
        if(!newSection){
            return res.status(400).json({
                success:false,
                message:"Error while creating an Entry in the database"
            })
        }

        //updating the courseSchema of section
        const updatedCourse = await Course.findByIdAndUpdate(courseId,
                                                             {
                                                                $push:{courseContent:newSection._id}
                                                             },
                                                             {new:true}
                                                             ).populate({
                                                                path: "courseContent",
                                                                populate: {
                                                                  path: "subSection",
                                                                },
                                                              })
                                                              .exec()//TODO: use populate to show section and subsections details
        
        //returning the response
        return res.status(200).json({
            success:true,
            message:"Section is created Successfully",
            updatedCourse
        })                                                     


    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Error while creation of Section",
            error: error.message,
        })
    }
}


//updating the section
exports.updateSection = async(req,res)=>{
    try {
        //fetching the section.id from the req body
        // const {id}=req.params;
        const {sectionName,sectionId, courseId }=req.body;
        
        //validating the data
        if(!sectionId || !sectionName)
        {
            return res.status(200).json({
                success:false,
                message:"Please provide the required details"
            })
        }

        //fetching the data
        const section = await Section.findByIdAndUpdate(sectionId,
                                                              {sectionName:sectionName},
                                                              {new:true});

        if(!section)
        {
            return res.status(400).json({
                success:false,
                message:"Error during updating the section"
            })
        }

        const course = await Course.findById(courseId)
        .populate({
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        })
        .exec()
        
        //returning the response
        res.status(200).json({
            success: true,
            message: section,
            data: course,
          })


    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Error while updating the section",
            error: error.message,
        })
    }
}


//deleting the Section
exports.deleteSection = async(req,res)=>{
    try {
        //fetching the id - assuming we have sending the id in params
        //here i need the courseId so that when we delete the section then we can update the courseContent
        const {sectionId,courseId}=req.body;
        const section = await Section.findById(sectionId)
        //validating the data
        if(!sectionId){
            return res.status(400).json({
                success:false,
                message:"Section is not found"
            })
        }
        
        
        const updatedCourse=await Course.findByIdAndUpdate(courseId,
                                                          { $pull: { courseContent: sectionId} },
                                                          {new:true})


        // Delete the associated subsections
        await SubSection.deleteMany({ _id: { $in: section.subSection } })

        await Section.findByIdAndDelete(sectionId)
        //deleting the section
        // find the updated course and return it
         const course = await Course.findById(courseId)
         .populate({
           path: "courseContent",
           populate: {
             path: "subSection",
           },
         })
         .exec()
        
         res.status(200).json({
            success: true,
            message: "Section deleted",
            data: course,
          })


    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Error while deleting the Section",
            error: error.message,
        })
    }
}