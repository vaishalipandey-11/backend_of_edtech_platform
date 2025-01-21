const User =  require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt"); 


//send OTP 
exports.sendOTP = async (req, res)=>{
    try{
        // fetch email from request body please 
        const {email} = req.body;
        
        //check if already exists or not 
        const checkUserPresent = await User.findOne({email});
        
        // if user already exists , then return a response
        if(checkUserPresent){
            return res.status(401).json({
                success: false ,
                message:'User already registered',
            })
        }

        //generate otp 
        var otp = otpGenerator.generate(6,{
            upperCaseAlphabets :false,
            lowerCaseAlphabets:false,
            specialChars:false,
        });

        //check unique otp or not 
        let result = await OTP.findOne({opt:otp});

        while(result){
            otp = otpGenerator(6,{
                upperCaseAlphabets :false,
                 lowerCaseAlphabets:false,
                 specialChars:false,
            });
            
            result = await OTP.findOne({otp:otp});
        }
        const otppayload = {email,otp};

        // create an entry for OTP
        const otpBody = await OTP.create(otppayload);
        console.log(otpBody);

        //return response successful
        res.status(200).json({
            success:true,
            message:'OTP Sent Successfully',
            otp,
        })


    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })

    }
}



//signUp 

exports.singUp = async (req , res ) =>  {
   try{
     //data fetch from req body 
     const {
        firstName ,
        lastName ,
        email,
        password ,
        accountType ,
        confirmPassword,
        contactNumber ,
        otp
     } = req.body;

     //validate krlo 

     if(!firstName || !lastName || !email || !password || !confirmPassword 
        || !otp){
            return res.status(403).json({
                 success:false,
                 message:"All fields are required ",
            })

        }


     // 2 password match krlo 
     if(password != confirmPassword){
        return res.status(400).json({
            success:false,
            message:'Password and ConfirmPassword does not match , please try again ',

        });
     }

     //check user alredy exists ornot 
     const existingUser = await User.findOne({email});
     if(existingUser){
        return res.status(400).json({
            success:false,
            message:'Useris already registered ',
        });
     }


     //find most recent otp for the user
     const recentOtp = await OTP.find({email}).sort({createdAt:-1}).limit(1);
     console.log(recentOtp);

     //validate otp 
     if(recentOtp.length ==0 ){
        //otp not found 
        return res.status(400).json({
            success:false,
            message:'OTP Found',
        })

     }else if(otp != recentOtp){
        //Invelid OTP 
        return res.status(400).json({
            success:false,
            message:"Invalid OTP",
        });
     }


     //hash password 
     const hashedPassword = await bcrypt.hash(password, 10);

     // make a profile for additional details in entry creation 
     const profileDetails = await Profile.create({
        geneder:null,
        dateOfBirth:null ,
        about:null,
        contactNumber:null,
     });
     
     //entry create in DB
     const user = await User.create({
        firstName,
        lastName,
        email,
        contactNumber,
        password:hashedPassword,
        accountType,
        additionalDetails:profileDetails._id, // obj id pass krna hota h toh phle ek null obj create kro then ....
        image:`https://api.dicebear.com/9.x/initials/svg?seed=${firstName} ${lastName
        }`,
     })

       //return response 
       return res.status(200).json({
        success:true,
        message:'User is registered Successfully',
        user,
       });
   }
            catch(error){
                console.log(error);
                return res.status(500).json({
                    success:false,
                message:"User cannot be registered . Please try again ",
                })
                

            }
     }


//login 

exports.login = async(req,res)=>{
    try{
        //get data from req body
        const {email ,password } = req.body ;

        //validate data
        if(!email || !password){
            return res.status(403).json({
                success:false,
                message:'All field are required , please try again',
            }

            );

        }

        //user check exists or not 
        const user = await User.findOne({email}).populate("additionalDetails");
        if(!user){
             return res.status(401).json({
                success:false,
                message:"User is not registered , please signup first ",
             });
        }

        //generate JWT , after password matching 
        if(await bcrypt.compare(password, user.password)){
            const payload = {
                email:user.email,
                id: user._id,
                role:user.role,
            }
            const token = jwt.sign(payload , process.env.JWT_SECRET,{
                expiresIn:"2h",
            });

            user.token = token ;
            user.password = undefined ;

            // create cookie and send response 
            const option ={
                expires : new Date(Datew.now() + 3*24*60*60*1000),
                httpOnly :true,
            }
            res.cookie ("Token", tooken , option).status(200).json({
                success:true,
                token ,
                user,
                message:'Logged in successfully',
            })
        }
        else{
            return res.status(401).json({
                success:false,
                message :'Password is incorrect',
            });
        }
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Login Failure , Please try again',
        });
    }
};




// //change password
// exports.changepassword = async(req,res)=>{
//     //get data from req body 
//     const {} = req.body  ;
//     //get oldpassword , newpassword , confirmpassword 
//     //validation
//     if(!newpassword  || !oldpassword || !confirmPassword){
//         return res.status(200).json({
//             success:false,
//             message:"all fields are required ",
//         })
//     }

//     //update pwd in db 
//     //send mail - password updated
//     // return response 
//     return res.status(200).json({
//         success:true,
//         message:"password updated successfully "
//     })

// }





// Change password
exports.changepassword = async (req, res) => {
    try {
        // Destructure data from request body
        const { oldPassword, newPassword, confirmPassword } = req.body;

        // Validate input
        if (!oldPassword || !newPassword || !confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            });
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "New password and confirm password do not match."
            });
        }

        // Get the logged-in user (assuming user ID is available via authentication middleware)
        const userId = req.user.id; // Make sure req.user is populated by your auth middleware
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        // Verify old password (assuming passwords are hashed)
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Old password is incorrect."
            });
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update the password in the database
        user.password = hashedPassword;
        await user.save();

        // Optionally, send an email notification about the password update
        // sendEmail(user.email, "Password Updated", "Your password has been successfully updated.");

        // Return success response
        return res.status(200).json({
            success: true,
            message: "Password updated successfully."
        });
    } catch (error) {
        console.error("Error in changepassword: ", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again later."
        });
    }
};
