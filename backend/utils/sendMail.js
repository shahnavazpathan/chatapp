import nodemailer from "nodemailer";

import otpDoc from "../models/otps.model.js";

const sendMail = async (host, receiverEmail, userId) => {
  try {
    let protocol;
    if (!host.includes("localhost")) {
      protocol = "https";
    } else {
      protocol = "http";
    }
    const otp = Math.floor(100000 + Math.random() * 900000);

   
    const newOtp = new otpDoc({
      userId,
      otp
    });
    await newOtp.save();

    let verificationLink = `${protocol}://${host}/api/auth/verify?otp=${otp}`;

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
      text: `Please verify your email by clicking the following link: ${verificationLink}`,
      html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Verify Your Email - FinanceTracker</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  background-color: #f4f4f4;
                  margin: 0;
                  padding: 0;
                  color: #333;
              }
              .container {
                  width: 100%;
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                  background-color: #ffffff;
                  border-radius: 8px;
                  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
              }
              .header {
                  background-color: #4CAF50;
                  padding: 20px;
                  text-align: center;
                  border-top-left-radius: 8px;
                  border-top-right-radius: 8px;
                  color: #ffffff;
                  font-size: 24px;
              }
              .content {
                  padding: 20px;
                  text-align: left;
                  line-height: 1.6;
                  color: #333;
              }
              .content p {
                  margin: 0;
                  margin-bottom: 10px;
              }
              .button {
                  display: inline-block;
                  background-color: #4CAF50;
                  color: white;
                  text-decoration: none;
                  padding: 12px 24px;
                  border-radius: 5px;
                  font-size: 16px;
                  font-weight: bold;
                  margin-top: 20px;
              }
              .footer {
                  text-align: center;
                  padding: 10px;
                  font-size: 12px;
                  color: #888;
                  margin-top: 20px;
                  border-top: 1px solid #eeeeee;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="header">
                  Welcome to Apex!
              </div>
              <div class="content">
                  <p>Hi there,</p>
                  <p>Thank you for signing up with <strong>Apex</strong>! We're excited to have you on board.</p>
                  <p>To get started and verify your email, please click the link below:</p>
                  <a href="${verificationLink}" class="button">Verify Email</a>
                  <p>If the button doesn't work, copy and paste the following link into your browser:</p>
                  <p>${verificationLink}</p>
                  <p>If you did not sign up for Apex, you can safely ignore this email.</p>
                  <p>Thanks,</p>
                  <p>The Apex Team</p>
              </div>
              <div class="footer">
                  <p>&copy; 2024 Apex. All rights reserved.</p>
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
