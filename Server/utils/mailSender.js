const nodemailer=require("nodemailer");


require("dotenv").config();

const mailSender= async(email,title,desc)=>{
    try {
        let transporter=nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS
            },
        })

        let info=await transporter.sendMail({
            from:'"Notion Academy | by Vishal Singh" us55547660@gmail.com',
            to:`${email}`,
            subject:`${title}`,
            html:`${desc}`
        })
        console.log("Email is sent to the ",email);
         return info;

    } catch (error) {
        console.log("Error in the mailSender");
        console.log(error);
    }
}

module.exports=mailSender