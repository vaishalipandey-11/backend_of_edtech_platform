const Course = require("../models/Course");
const Tag = require ("../models/tags");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const {uploadImageToCloudinary} = require("../utils/imageUploader");

// createCourse Handler function
exports.createCourse = async (req,res)=>{
    try{

        // fetch data 
        const {courseName , courseDescription ,whatyouwillLearn , price , tag} = req.body;


        // get thumbnail 
        const thumbnail = req.files.thumbnailImage;

        //validation 
     if(!courseName || !courseDescription || !whatyouwillLearn || !price || !tag || !thumbnail){
        return res.status(400).json({
            success:false ,
            message:'All fields are required',
        });
     }
     // check for instructor 

     const userId = req.user.id ;
     const  instructorDetails = await User.findById(userId);
     console.log("Instructor Details: ", instructorDetails);

     if(!instructorDetails){
         return res.status(404).json({
            success:false ,
            message :"Instructor Details not found ",
         });
     }
     // check given tag id valid or not 
     const tagDetails  = await Tag.findById(tag);
     if(!tagDetails){
        return res.status(404).json({
            success:false,
            message:"Tag Details not found ",
        });
     }
     //upload Image top Cloudinary 
     const thumbnailImage = await uploadImageToCloudinary(thumbnail  , process.env.FOLDER_NAME);

     // create an entry for new course 
     const newCourse = await Course.create({
        courseName,
        courseDescription,
        instructor : instructorDetails._id,
        whatyouwillLearn:whatyouwillLearn,
        price ,
        tag:tagDetails._id,
        thumbnail:thumbnailImage.secure_url,
     })

     // add the new course tothe user schema of the instructor 
        await User.findByIdAndUpdate({
            _id:instructorDetails.id
        },
    
        {
            $push:{
                courses:newCourse._id,
            }


        },
         {new:true},
    );

    //update the Tag ka schema 
    // hw 

    // return  response 
    return res.status(200).json({
        success:true,
        message:"Course Created successfully" ,
        data : newCourse,
    });

}
    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:'Failed to create course ',
            error : error.message,

        })
    }
};



// get all courses handler function 
exports.showAllCourses = async (req, res )=>{
    try{
     
        // change the below code after review 
        const allCourse = await Course.find({},{courseName:true,
            price:true,
            thumbnail:true,
            instructor:true,
            ratingAndReviews :true ,
            studentsEnrolled:true,
        }).populate("instructor")
        .exec();

        return res.status(200).json({
            success:true ,
            message:'Data for all courses fetched successfully ',
            data: allCourse,
        })
    }
    catch(error){
        console.log(error);
        return res.status.json({
            success:true ,
            message :'Cannot fetch course data ',
            error :error.message ,
        }
        )
    }
}
