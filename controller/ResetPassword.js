  const User = require("../models/User");
  const mailSender = require("../utils/mailSender");
  const bcrypt = require("bcrypt");


  // resetPasswordToken 
  exports.resetPasswordToken = async (req, res) =>{
            try{
                //get email from the req body 
            const email = req.body.email;
            //check user from this enail validation
            const user = await User.findOne({email:email});
            if(!user){
                return res.json({
                    success: false ,
                    message :'Your Email is not registered with us'
                });

            }
            //  generate token 
            const token = crypto.randomUUID();
            //update user by adding token and expiration time 
            const updateDetails = await User.findByIdAndUpdate(
                                                    {email:email},
                                                    {
                                                        token:token ,
                                                        resetPasswordExpires :Date.now()+ 5*60*1000,
                                                    },
                                                    {new: true } 
            );
            //create url
            const url = `http://localhost:3000/update-password/${token}`

            // send mail containing the url 
            await mailSender (email,
                            "Password Reset Link ",
                            `Password Rest Link :${url}`
                                                    );

            // return response 
            return res.json({
                success:true,
                message:'Email sent successfully , please check email and change password ',
            });
                                                    

            }
            catch(error){
                console.log(error);
                return res.status(500).json({
                    success:false ,
                    message:'Something went wrong while sending reset password mail'
                })

            }

  }

  //reset password 
  exports.resetpassword = async (req, res)=>{
            try{
                // data fetch 
                const {password , confirmPassword , token } = req.body;
                //validation 
                if(password !==  confirmPassword) {
                    return res.json({
                        success:false ,
                        message:'Password not matching ',
                    });
            
                }   
                // get userdetails from db using token 
                const userdetails = await User.findOne({token:token});
                //if no entry - invalid token 
                if(!userdetails){
                    return res.json({
                    success: false,
                    message :'Token is invalid ',
                        });
            }
            // hash pwd
            const hashedPassword = await bcrypt.hash(password,10);

            //password update 
            await User.findByIdAndUpdate(
                                {token:token},
                            {password :hashedPassword},
                        {new:true });

            // return response 
            return res.status(200).json({
                success:true,
                message:'Password reset successful ',
            });

            }
            catch(error){
                console.log(error );
                return res.status(500).json({
                    success:false,
                    message :'Something went wrong while sending reset pwd mail'
                })

            }


}