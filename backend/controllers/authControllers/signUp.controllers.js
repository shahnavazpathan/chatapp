import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../../utils/generateToken.js";
import sendMail from "../../utils/sendMail.js";
import User from "../../models/users.model.js";

const signUp = async (req, res) => {
  try {
    let { username, password, confirmPassword, email } = req.body;

    if (!username || !password || !email || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }
    username = username.trim();
    email = email.trim();
    if (
      username.includes(" ") ||
      password.includes(" ") ||
      email.includes(" ") ||
      confirmPassword.includes(" ")
    ) {
      return res.status(400).json({ message: "Space not allowed" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Password did not match!" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be 8 characters long!" });
    }

    if (
      !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]+$/.test(
        password
      )
    ) {
      return res
        .status(400)
        .json({
          message:
            "Invalid password: Must be alphanumeric and contain at least one special character!",
        });
    }

    
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailPattern.test(email)) {
      return res
        .status(400)
        .json({ message: "Please enter valid email address!" });
    }

    // const [existCheck] = await databaseConnection.query(
    //   `select userName from users where userName = ?`,
    //   [username]
    // );
    const existingUser = await User.findOne({username});
    if (existingUser) {
      return res.status(400).json({ message: "username already exists!" });

    }
    
    // if (existCheck.length > 0) {
    //   return res.status(400).json({ message: "user already exists!" });
    // }

    let hashedPassword = await bcrypt.hash(password, 7);
    let hashedEmail = await bcrypt.hash(email,process.env.EMAIL_SALT);

    const existingEmail = await User.findOne({email : hashedEmail});
    if (existingEmail) {
      return res.status(400).json({ message: "email already exists!" });

    }

    const newUser = new User({
      username,
      password : hashedPassword,
      email : hashedEmail
      
    });
      await newUser.save();

      const userId = await newUser._id;

    if (userId == undefined) {
      return res.status(500).json({ message: "internal server error" });
    }

    await generateTokenAndSetCookie(userId, res);

    const isSent = await sendMail(req.get("host"), email, userId);

    if (isSent === false) {
      return res
        .status(500)
        .json({ message: "please enter valid email address!" });
    }

    return res.status(200).json({ message: "Please verify your email!" });
  } catch (err) {
    console.log(err);

    return res.status(500).json({ message: "Internal server error" });
  }
};

export default signUp;
