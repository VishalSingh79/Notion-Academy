const express=require("express");
const app=express();

//All Routes
const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const courseRoutes =require("./routes/Course");
const paymentRoutes =require("./routes/Payments");
const dbConnect =require("./config/database");
const cookieParser = require("cookie-parser");

//since i want my backend to entertain the request of frontend to entrain so i need
const cors =require("cors");
const {cloudinaryConnect} =require("./config/cloudinary");
require("dotenv").config();
const fileUpload=require("express-fileupload");

const PORT = process.env.PORT   || 4000;

//database connect
dbConnect();
//middlewares
app.use(express.json());
app.use(cookieParser());
//all the request coming from this localhost you should entertain that
app.use(
    cors({
        origin:"*",
        methods: ['GET', 'POST', 'DELETE', 'PUT'],
        credentials:true,
    })
)
//for uploading to the cloudinary
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

//cloudinary connection
cloudinaryConnect();

//routes mounting
app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/profile",profileRoutes);
app.use("/api/v1/course",courseRoutes);
app.use("/api/v1/payment",paymentRoutes);

app.listen(PORT,()=>{
    console.log("App is listening at port ",PORT);
})

app.get("/",(req,res)=>{
    return res.json({
        success:true,
        message:"NotionAcademy Server is now Working"
    })
})
