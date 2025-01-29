import nodemailer from "nodemailer";

import otpDoc from "../models/otps.model.js";

const sendMail = async (host, receiverEmail, userId) => {
  try {
    
    const otp = Math.floor(100000 + Math.random() * 900000);

   
    const newOtp = await otpDoc.create({
      userId,
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
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>OTP Verification</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f4f4f4;
        color: #333;
        line-height: 1.6;
      }
      .email-container {
        max-width: 600px;
        margin: 20px auto;
        background: #ffffff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }
      .header {
        text-align: center;
        margin-bottom: 20px;
      }
      .header h1 {
        margin: 0;
        font-size: 24px;
        color: #4caf50;
      }
      .otp {
        display: inline-block;
        background: #f1f1f1;
        padding: 10px 15px;
        border-radius: 4px;
        font-size: 18px;
        font-weight: bold;
        color: #333;
        letter-spacing: 2px;
        margin: 20px 0;
      }
      .content {
        text-align: center;
      }
      .footer {
        margin-top: 20px;
        font-size: 12px;
        color: #888;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="header">
        <h1>Welcome to Apex!</h1>
      </div>
      <div class="content">
        <p>Hi there,</p>
        <p>Your OTP for verifying your account is:</p>
        <div class="otp">${otp}</div>
        <p>This OTP is valid for 10 minutes. Please do not share it with anyone.</p>
        <p>If you did not request this, you can safely ignore this email.</p>
      </div>
      <div class="footer">
        <p>&copy; 2025 Apex. All rights reserved.</p>
      </div>
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
