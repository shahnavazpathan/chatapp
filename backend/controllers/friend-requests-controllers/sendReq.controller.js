import User from "../../models/users.model.js";

const sendReq = async (req, res) => {
  try {
    let { username } = req.body;
    if (!username) {
      return res.status(400).json({ message: "Please provide username" });
    }

    username = username.trim();
    const existingUser = await User.findOne({
      username,
    });
    if (!existingUser) {
      return res.status(400).json({ message: "User not found!" });
    }
    if (await User.findOne({ friendReqs: [req.userId],username })) {
      return res
        .status(400)
        .json({ message: "The friend request already present!" });
    }
    await User.updateOne({ username }, { $push: { friendReqs: [req.userId] } });
    return res
      .status(200)
      .json({ message: "Friend request sent successfully!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export default sendReq;
