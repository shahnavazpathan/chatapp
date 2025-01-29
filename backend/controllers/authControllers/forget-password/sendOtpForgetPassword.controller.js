import User from "../../../models/users.model.js";
import bcrypt from "bcryptjs";
import sendMail from "../../../utils/sendMailForgPass.js";

const sendOtpForgPass = async (req, res) => {
  try {
    let { email } = req.body;
    if (!email) {
    return res.status(400).json({ message: "Please provide email address!" });

    }
    let hashedEmail = bcrypt.hash(email, process.env.EMAIL_SALT);

    const isExist = await User.findOne({ email: hashedEmail });
    if (!isExist) {
      return res
        .status(400)
        .json({ message: "No user found with this email!" });
    }

    const isSent = await sendMail(email);

    if (isSent === false) {
      return res
        .status(500)
        .json({ message: "please enter valid email address!" });
    }

    return res.status(200).json({ message: "Please verify your email and do reset your password!" });

  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default sendOtpForgPass;