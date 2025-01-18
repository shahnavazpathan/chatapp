import bcrypt from "bcryptjs";

import generateTokenAndSetCookie from "../../utils/generateToken.js";
import User from "../../models/users.model.js";

const signIn = async (req, res) => {
  try {
    let { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingUser = await User.findOne({
      username
    });
    if (!existingUser) {  
      return res
      .status(400)
      .json({ message: "username or password is incorrect" });
    }
   

    let isMatch = await bcrypt.compare(password, existingUser.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "username or password is incorrect" });
    }
    await generateTokenAndSetCookie(existingUser.userId, res);

    return res.status(200).json({ message: "logged in", userId : existingUser.userId, username });
  } catch (err) {
    console.log(err);
    
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default signIn;
