import forget_password_otps from "../../../models/foget_password_otps.model.js";
import User from "../../../models/users.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const resetPassword = async (req, res) => {
  const resetToken = req.cookies.resetToken;
  const { newPassword } = req.body;

  if (!resetToken) {
    return res
      .status(400)
      .json({ message: "Unauthorized access, Please provide token!" });
  }

  try {
    const decoded = jwt.verify(resetToken, process.env.JWT_SECRET);
    const email = decoded.email;

    const hashedPassword = await bcrypt.hash(newPassword, 7);

    await User.updateOne({ email }, { password: hashedPassword });

    return res
      .clearCookie("resetToken")
      .json({ message: "Password reset successful. You can now log in." });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default resetPassword;