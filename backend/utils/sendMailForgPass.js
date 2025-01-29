import nodemailer from "nodemailer";

import forget_password_otps from "../models/foget_password_otps.model.js";

const sendMail = async (email) => {
  try {
    
    const otp = Math.floor(100000 + Math.random() * 900000);

   
    const newOtp = await forget_password_otps.create({
      email,
      otp
    });
   
    

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASS,
      },
      port: 465,
    });

    const mailOptions = {
      from: process.env.EMAIL_ADDRESS,
      to: receiverEmail,
      subject: "Verify Your Email - Apex",
      text: `Please verify your email`,
      html: `
      <!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; text-align: center; }
        .container { max-width: 500px; background: #ffffff; padding: 20px; margin: auto; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); }
        h2 { color: #333; }
        p { font-size: 16px; color: #555; }
        .otp { font-size: 24px; font-weight: bold; color: #007bff; background: #e6f2ff; padding: 10px; border-radius: 5px; display: inline-block; margin-top: 10px; }
        .footer { font-size: 12px; color: #888; margin-top: 20px; }
    </style>
</head>
<body>
    <div class="container">
        <h2>Apex - Password Reset</h2>
        <p>Hello,</p>
        <p>You requested to reset your password. Use the OTP below to proceed:</p>
        <div class="otp">${otp}</div>
        <p>This OTP is valid for 10 minutes. If you did not request this, please ignore this email.</p>
        <p>Thank you,<br><strong>Apex Team</strong></p>
        <div class="footer">© 2025 Apex. All rights reserved.</div>
    </div>
</body>
</html>


    `,
    };

    await transporter.sendMail(mailOptions);

    return true;
  } catch (error) {
    console.log(error);

    return false;
  }
};

export default sendMail;
