//1.) authenticity check     2.)isStudent check    3.)isInstructor check       4.)isAdmin check
const jwt = require("jsonwebtoken");
require("dotenv").config();

                                            //authentication check
exports.auth= async(req,res,next)=>{
    try {
        //TODO: extract token
        const token = req.body.token || req.cookies.token || req.header("Authorization").replace("Bearer ","");
       //if token is missing then return the response
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Login or Sign up first"
            })
        }
        
        //verifying the token
        try {
            const decode=jwt.verify(token,process.env.JWT_SECRET);
            req.user=decode;
    
        } catch (error) {
            res.status(401).json({
                success:false,
                message:"Login or Sign up first"
            })
        }

        next();

    } catch (error) {
        console.log("Error in the authencityCheck ",error);
        return res.status(500).json({
            success:false,
            message:"Error in authencityCheck"
        })
    }


}

                                            //isStudent check
exports.isStudent = async(req,res,next)=>{
    try {
        if(req.user.accountType!== "Student"){
            return res.status(401).json({
                success:false,
                message:"Only Student can accesss this feature"
            })

        }

        next();

    } catch (error) {
        console.log("Error in the isStudent middleware",error);
        return res.status(500).json({
            success:false,
            messasge:"Student Role is not verified"
        })
    }
}

                                            //isInstructor check
exports.isInstructor = async(req,res,next)=>{
    try {
        if(req.user.accountType!== "Instructor"){
            return res.status(401).json({
                success:false,
                message:"Only Instructor can accesss this feature"
            })

        }

        next();

    } catch (error) {
        console.log("Error in the isInstructor middleware",error);
        return res.status(500).json({
            success:false,
            messasge:"Instructor Role is not verified"
        })
    }
}

                                            //isAdmin check
exports.isAdmin = async(req,res,next)=>{
    try {
        if(req.user.accountType!== "Admin"){
            return res.status(401).json({
                success:false,
                message:"This is the protected route for the Admin only"
            })

        }

        next();

    } catch (error) {
        console.log("Error in the isAdmin middleware",error);
        return res.status(500).json({
            success:false,
            messasge:"Admin Role is not verified"
        })
    }
}                                            

