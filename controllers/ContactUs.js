// const { contactUsEmail } = require("../mail/templates/contactFormRes")
// const mailSender = require("../utils/mailSender")

// exports.contactUsController = async (req, res) => {
//   const { email, firstname, lastname, message, phoneNo, countrycode } = req.body
//   console.log(req.body)
//   try {
//     const emailRes = await mailSender(
//       email,
//       "Your Data send successfully",
//       contactUsEmail(email, firstname, lastname, message, phoneNo, countrycode)
//     )
//     console.log("Email Res ", emailRes)
//     return res.json({
//       success: true,
//       message: "Email sent successfully",
//     })
//   } catch (error) {
//     console.log("Error", error)
//     console.log("Error message :", error.message)
//     return res.json({
//       success: false,
//       message: "Something went wrong...",
//     })
//   }
// }
const { contactUsEmail } = require("../mail/templates/contactFormRes");
const mailSender = require("../utils/mailSender");

exports.contactUsController = async (req, res) => {
    try {
        const { email, firstname, lastname, message, phoneNo, countrycode } = req.body;
        
        if(!email || !firstname || !message) {
            return res.status(400).json({
                success: false,
                message: "Required fields missing"
            });
        }

        const emailRes = await mailSender(
            email,
            "Your Data sent successfully",
            contactUsEmail(email, firstname, lastname, message, phoneNo, countrycode)
        );

        return res.status(200).json({
            success: true,
            message: "Email sent successfully"
        });
    } catch (error) {
        console.error("Contact Form Error:", error);
        return res.status(500).json({
            success: false,
            message: "Error sending email",
            error: error.message
        });
    }
};