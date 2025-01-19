import express from "express";
import otpDoc from "../../models/otps.model.js";
import User from "../../models/users.model.js";

const route = express.Router();

route.post("/verify", async (req, res) => {
  try {
    const { otp } = req.query;

    if (!otp) {
      return res.status(401).json({ message: "No otp found in the link" });
    }
    const dbOtp = await otpDoc.findOne({userId :req.userId,otp});

    if (!dbOtp || dbOtp.otp != otp) {
      return res.status(401).json({ message: "Unauthorized User" });
    }

    await User.updateOne(
      { _id: decoded.userId },
      { $set: { isVerified: true } }
    );

    return res.status(200).json({ message: "Email verfied successfully!" });
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Unauthorized User" });
  }
});

export default route;
