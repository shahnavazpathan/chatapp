import User from "../../models/users.model";

const sendReq = async (req, res) => {
  try {
   let {username} = req.body;
   if (!username) {
      return res.status(400).json({ message: "Please provide username" });
    }
    username = username.trim();
    const existingUser = await User.findOne({
      username
    });
    if (!existingUser) {  
      return res
      .status(400)
      .json({ message: "User not found!" });
    }
    await 
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export default sendReq;
