
const mailSender= require("../utils/mailSender");


//mailing to the user to fill the contact form 
exports.mailToUser =async (req,res)=>{
    try {
        //fetching the data
        const {email,message,firstName,lastName}=req.body;

        //validating
        if(!email || ! message || !firstName || !lastName){
            return res.status(400).json({
                success:false,
                message:"Error in sending the message"
            })
        }

        //sending the mail

        const response = await mailSender(email,`${firstName} ${lastName}`,"We have received your message, and our team is currently reviewing your inquiry. One of our representatives will get back to you within [timeframe, e.g., 24-48 hours] to assist you further.")
        console.log(response);

        if(!response){
            return res.status(400).json({
                success:false,
                error:error.message,
                message:"Something went Wrong"
            })
        }

        return res.status(200).json({
            success:true,
            message:"Message is sent Successfully"
        })


    } catch (error) {
        return res.status(404).json({
            success:false,
            error:error.message,
            message:"Something went wrong"
        })
    }
}

//mailing to the ourself with the details of user
exports.mailToUs =async (req,res)=>{
    try {
        //fetching the data
        const {email,message,firstName,lastName}=req.body;

        //validating
        if(!email || ! message || !firstName || !lastName){
            return res.status(400).json({
                success:false,
                message:"Error in sending the message"
            })
        }

        //sending the mail

        const response = await mailSender("us55547660@gmail.com",`${firstName} ${lastName}:${email} is tried to contact us with the message :`,message)
        
        if(!response){
            return res.status(400).json({
                success:false,
                message:"Something went Wrong"
            })
        }

        return res.status(200).json({
            success:true,
            message:"Message is sent to us Successfully"
        })


    } catch (error) {
        return res.json({
            success:false,
            message:"Something went wrong"
        })
    }
}
