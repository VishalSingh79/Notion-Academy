//Controllers =====>  1.)createCategory  2.)showAllCategory   3.)categoryPageDetails

const Category=require("../models/Category");

//create Category ka handler  function
exports.createCategory = async (req,res) => {
    try {
        //fetching the data from the req
        const {name,description}=req.body;
        //validating the data

        if(!name || !description){
            return res.status(400).json({
                success:false,
                message:"Fill all the fields carefully"
            })
        }
        

        //creating an entry in the database
        const categoryDetails= await Category.create({
                                name:name,
                                description:description
                               });
        //returning a response
        
        return res.status(200).json({
            success:true,
            message:"Category is created Successfully"
        })


    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Error while creating the Category"
        })
    }
}

//getAllCategory Handler function

exports.showAllCategories = async(req,res)=>{
    try {
        
        const allCategory = await Category.find({},{name:true,description:true});

        return res.status(200).json({
            success:true,
            message:"All Category are retrieved Successfully",
            data:allCategory
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Error in getting all the Category"
        })
    }
}


//categoryPageDetails
exports.categoryPageDetails =async (req,res) => {
    try {
         // Get catalogId from query parameters, not from the body
         const { catalogId } = req.query;
         console.log("catalogId", catalogId);

        //get courses for the specific categoryId
        const selectedCourses = await Category.findById(catalogId)
                                              .populate("courses")
                                              .populate({
                                                path: "courses",
                                                match: { status: "Published" }  // Filter courses where status is "Published"
                                              })
                                              .exec();
                                              
                        
        //validation
        // if(selectedCourses.courses.length===0){
        //     return res.status(200).json({
        //         success:true,
        //         message:"No Course is found"
        //     })
        // }                   
        //finding the each categoryDetails

        //const categoryDetails
        // //course of  Top Selling Category course
        // const allCategories = await Category.find().populate("courses");
		// const allCourses = allCategories.flatMap((category) => category.courses);
		// const mostSellingCourses = allCourses
		// 	.sort((a, b) => b.sold - a.sold)
		// 	.slice(0, 10);


        //course of different Course category
        // const differentCategory = await Category.find({_id:{$ne:categoryId}})
        //                                                      .populate("courses")
        //                                                      .exec();
  

        return res.status(200).json({
            success:true,
            message:"Courses are fetched",
            data:selectedCourses
        })


    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Something went wrong in categoryPageDetails",
            error:error.message
        })
    }
}