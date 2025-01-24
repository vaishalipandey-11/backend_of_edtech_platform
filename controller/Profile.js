const Profile = require("../models/Profile");
const User = require("../models/User");

exports.updateProfile = async (req,res) =>{
    try{
        // get data
        const {dataOfBirth="",about="",contactNumber , gender} = req.body;
        // get userId 
        const id = req.user.id;
        //validation 
        if(!contactNumber || !gender || !id){
            return res.status(400).josn({
                sucess:false,
                Message:'All fields are required ',
            });
        }
        // find Profile
        const userDetails = await User.findById(id);
        const ProfileId = userDetails.additionalDetails;
        const ProfileDetails = await Profile.findById(profileId);

        //update Profile 
        ProfileDetails.dateOfBirth = dataOfBirth;
        ProfileDetails.about = about;
        ProfileDetails.gender = gender ;
        ProfileDetails.constactNumber = contactNumber;
        await ProfileDetails.save();
        // return res 
        return res.status(200).json({
            sucess:true,
            message :"profile Updated successfully",
            ProfileDetails,
        });
    }
    catch(error){
        return res.status(500).json({
            success:false,
            error:error.meassage,
        });
    }
}; 

// delete accound 
// Explore -> how can we schedule this deletion operation 

exports.deleteAccount= async (req , res) =>{
    try{
       
        //get id
        const id =req.user.id;
        //validation
        const userDetails = await User.findById(id);
        if(!userDetails){
            return res.status(404).json({
                success:false ,
                message :"user not found ",
            });
        }
        //delete profie 
        await Profile.findByIdAndDelete({_id:userDetails.additionalDetails});
        //TODO : hw unenroll user from all enrolled cousers
        // delete user 
        await User.findByIdAndDelete({_id:id});

        // return res
        return res.status(200).json({
            success:true ,
            message :"User Deleted Successfully ",
        })
        
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:'User cannot be deleted successfully ',
           
    });
    }
};

exports.getAllUserDetails = async (req , res) =>{
    try{
        // get id
        const id = req.user.id;
      
        /// validation and get user deatils 
        const userDetails = await User.findById(id).populate("additionalDetails").exec();
        // return res
        return res.status(200).json({
            success:true ,
            message :"User data Fetched Successfully ",
        });
    }
    catch(error){
        return res.status(500).json({
            success:false,
            
            meassage : error.message,
    });
    }
}