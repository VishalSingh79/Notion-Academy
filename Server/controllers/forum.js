//controllers =======>  1.)createQuestion   2.)createAnswer    2.)getAllAnswerAndQuestion

const User =require("../models/User");
const Question=require("../models/Question");
const Answer=require("../models/Answer");
const Course =require("../models/Course");
//createQUestion
exports.createQuestion= async(req,res)=>{
    try {
        //fetching the data 
        const{question}=req.body;
        const {courseId}=req.query;
        const askedBy=req.user.id;

        
        //validating the data
        if(!question || !askedBy  || !courseId){
            res.status(400).json({
                success:false,
                message:"Fill the data carefully",
                error:error.message
            })
        }

       

        //creating an entry in the database
        const response= await Question.create({question,askedBy});

        if(!response){
            res.status(400).json({
                success:false,
                message:"Entry is not created in the database",
                error:error.message
            })
        }

        //updating the forum in the course model
        const response1 = await Course.findByIdAndUpdate(
                                                        courseId,
                                                        {$push:{forum:response._id}},
                                                        {new:true}
                                                         )
      res.status(200).json({
        success:true,
        message:"Question is created Successfully",
        data:response
      })


    } catch (error) {
        console.log(error);
        res.status(400).json({
            success:false,
            message:"Error in posting the question",
            error:error.message
            
        })
    }
}

//createAnswer
exports.createAnswer= async(req,res)=>{
    try {
        //fetching the data 
        const{text , questionId}=req.body;
       // const {courseId}=req.query;
        const answeredBy=req.user.id;

        //validating the data
        if(!text || !questionId  || !answeredBy){
            res.status(400).json({
                success:false,
                message:"Fill the data carefully"
            })
        }

        //creating an entry in the database
        const response= await Answer.create({
                             answer:text,
                             answeredBy:answeredBy
                            });

        if(!response){
            res.status(400).json({
                success:false,
                message:"Entry is not created in the database"
            })
        }

        //updating the Question forum in the course
        const response1 = await Question.findByIdAndUpdate(
                                                        questionId,
                                                        {$push:{answeredBy:response._id}},
                                                        {new:true}
                                                         )
      res.status(200).json({
        success:true,
        message:"Answer is created Successfully"
      })


    } catch (error) {
        console.log(error);
        res.status(400).json({
            success:false,
            message:"Error in posting hthe question",
            error:error.message
            
        })
    }
}

//getAllQuestions
exports.getAllQuestions =async (req,res)=>{
    try {
         //fecthing the data
         const {courseId}=req.query; 
        if(!courseId){
            res.status(400).json({
                success:false,
                message:"No courseID id found",
                error:error.message
            })
        }

        //geting the data from the database
        const response = await Course.findById(courseId).populate({
            path: 'forum',
            populate: [
              { path: 'askedBy' },      
              {
                path: 'answeredBy',    
                populate: { path: 'answeredBy' } 
              }
            ]
          });
          
      
          res.status(200).json({
            success:true,
            message:"All the questions are fetched successfully",
            data:response
        });



    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Error in fetching all the question",
            error:error.message
        })
    }
}

