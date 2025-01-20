const nodemailer = require("nodemailer");

const mailSender = async ( email , title , body) =>{
    //mailsend krne k liye transpoterftn using nodemailer 
    try{
        // Create a transporter
        let transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,// SMTP server (e.g., Gmail)
            auth:{
                user:process.env.MAIL_USER,// Your email address
                pass:process.env.MAIL_PASS,// Your email password or App Password
            }
        })
            // Email options
        let info = await transporter.sendMail({ // SEND MAIL FTN TO SEND EMAIL
            from:'StudyBuddy || TUX - by vaishali', // Sender address
            to:`${email}`,// Recipient(s)
            subject:`${title}`,   // Email subject
            html:`${body}`,     // HTML body
        })
        console.log(info);
        return info;
    }
    catch(error){
        console.log(error.message);

    }
}
module.exports = mailSender;
