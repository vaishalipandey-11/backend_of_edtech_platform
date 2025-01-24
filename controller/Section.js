const Section = require("../models/Section");
const Course = require("../models/Course");

exports.createSection = async(req,res) =>{
try{
        // data fetch 
        const {sectionName , courseId} = req.body ;
        // validate data 
        if(!sectionName | !courseId){
            return res.status(400).json({
                success:false,
                message:'missing Properties',
            });
        }
    
        // create section 
        const newSection = await Section.create({sectionName});
        // update course with section objectID
        const updatedCourseDetails = await Course.findByIdAndUpdate(
                                                  courseId ,
                                                  {
                                                    $push:{
                                                        courseContent : newSection._id,
                                                    }
                                                  }  ,
                                                  {new:true},
        );
    
        // hw use populate to replace section / subsection both in the updatedCourseDetails
        // return response 
        return res.status(200).json({
            success:true ,
            message:'Section created successfully ',
            updatedCourseDetails,
        })
}
    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false ,
            message:'unable to create a section , please try again',
            error:error.message,
        });
    }
    
}


exports.updateSection = async (req, res ) =>{
    try{
        // data input 
        const {sectionName , sectionId} = req.body;
        // data validation 
        if(!sectionName || !sectionId){
            return res.status(400).json({
                sucess:false,
                message:'Missing Properties',
            });
        } 

        // update data
        const section = await Section.findByIdAndUpdate(sectionId , {sectionName }, {new:true});
        // return res 
        return res.status(200).json({
             success:true ,
             message:'Section Updated sucessfully ',
        });
    }
    catch(error ){
        return res.status(500).json({
            success:false,
            message:'unable to update section , please try again',
            error : error.message,
    });


    }
};

exports.deleteSection = async (req , res) =>{
    try{
        // get id - assuming that we ae sending is in param
        const {sectionId} = req.params
        // use findByIdand Delete 
        await Section.findByIdAndDelete(sectionId);
        // TODO : do we need to delete the entry from the course schema?? -- testing time 
        // return res
        return res.status(200).json({
            success:false ,
            message :"Section Deleted Successfully ",
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:'unable to delete section , please try again',
            error : error.message,
    });
    }
}