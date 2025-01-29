import forget_password_otps from "../../../models/foget_password_otps.model.js";
import User from "../../../models/users.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

const verifyPassword = async (req, res) => {
  try {
    let { email,otp } = req.body;
    if (!email || !otp) {
    return res.status(400).json({ message: "Please provide email address and otp!" });

    }
    let hashedEmail = bcrypt.hash(email, process.env.EMAIL_SALT);

    const isExist = await User.findOne({ email: hashedEmail });
    if (!isExist) {
      return res
        .status(400)
        .json({ message: "No user found with this email!" });
    }

    const isExistOtp = await forget_password_otps.findOne({ email: hashedEmail,otp });
    if (!isExistOtp) {
      return res
        .status(400)
        .json({ message: "Please try reseting password again!" });
    }
    await forget_password_otps.updateOne({email}, {isVerified : true});
    const resetToken = jwt.sign({email},process.env.JWT_SECRET,{expiresIn : "10m"});
    res.cookie("resetToken", resetToken, {
      httpOnly: true,     
      secure: true,        
      sameSite: "Strict",
      maxAge: 10 * 60 * 1000 
  }).json({ message: "OTP verified successfully, now please reset the password within 10 minutes." });
  
  

  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default verifyPassword;