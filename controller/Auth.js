const User =  require("../models/User");
const OTP = require("../models/OTP");



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
     const hashedPassword = await bcrypt.hash(Password , 10);
     
     //entry create in DB
     const user = await User.create({
        firstName,
        lastName,
        email,
        contactNumber,
        password:hashedPassword,
        accountType,
        additionalDetails:
     })
    
     }
}


//login 



//change password
