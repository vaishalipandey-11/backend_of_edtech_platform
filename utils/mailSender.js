const nodemailer = require("nodemailer")




const mailSender = async (email, title, body) => {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      secure: false, // or true if SSL is required
    });

    let info = await transporter.sendMail({
      from: `"CodeZen| vaishali" <${process.env.MAIL_USER}>`,
      to: email,
      subject: title,
      html: body,
    });
    console.log("Email sent successfully:", info.response);
    return info;
  } catch (error) {
    console.error("Error in sending email:", error.message);
    return error.message;
  }
};


module.exports = mailSender
