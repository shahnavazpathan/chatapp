import nodemailer from "nodemailer";
import express from "express";

const route = express.Router();

const mailRoute = async (req, res) => {
  try {
    let { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(500).json({ message: "All fields are required!" });
    }
    name = name.trim();
    email = email.trim();
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailPattern.test(email)) {
      return res
        .status(400)
        .json({ message: "Please enter valid email address!" });
    }
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASS,
      },
      port: 465,
    });

    const mailOptionsToGetMail = {
      from: process.env.EMAIL_ADDRESS,
      to: process.env.PERSONAL_MAIL_ADDRESS,
      subject: "mail from visitor of finance tracker",
      text: message,
    };

    await transporter.sendMail(mailOptionsToGetMail);

    
    const mailOptionsToSendMail = {
      from: process.env.EMAIL_ADDRESS,
      to: email,
      subject: "Thank You for Your Interest in Working Together!",
      html: `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Thank You for Your Interest!</title>
          <style>
              body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
              .container { max-width: 600px; margin: 20px auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); }
              .header { background-color: #4CAF50; color: white; padding: 10px; border-radius: 8px 8px 0 0; text-align: center; }
              .content { padding: 20px; color: #333; line-height: 1.6; }
              .content p { margin: 0 0 15px; }
              .footer { text-align: center; font-size: 12px; color: #777; margin-top: 20px; }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="header">
                  <h2>Thank You for Reaching Out!</h2>
              </div>
              <div class="content">
                  <p>Hi ${name},</p>
                  <p>Thank you for your interest in collaborating with me! I’ve received your message through my FinanceTracker project website, and I appreciate your interest in my open-source API and development work.</p>
                  <p>I will review your message and get back to you as soon as possible. Whether you have a project in mind, need technical expertise, or have specific requirements, I’m looking forward to discussing how I can support your goals.</p>
                  <p>In the meantime, feel free to explore my API documentation and the features on my website. I’ll be in touch soon to take the next steps.</p>
              </div>
              <div class="footer">
                  <p>FinanceTracker Team &copy; 2024. All rights reserved.</p>
              </div>
          </div>
      </body>
      </html>`
    };
    
    
    await transporter.sendMail(mailOptionsToSendMail);
    return res.status(200).json({ message: "Message received successfully!" });

  } catch (error) {
    console.log(error);
    
    return res.status(500).json({ message: "Internal server error" });
  }
}

route.post("/sendmessage",mailRoute);
export default route;
