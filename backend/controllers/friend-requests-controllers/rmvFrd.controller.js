import User from "../../models/users.model.js";

const removeFriend = async (req, res) => {
  try {
    let { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ message: "Please provide userId!" });
    }
    if (!(await User.findOne({ _id: req.userId, friends: userId }))) {
      return res.status(400).json({ message: "You are not friends!" });
    }
    await User.updateOne({ _id: req.userId }, { $pull: { friends: userId } });

    return res.status(200).json({ message: "friend removed successfully!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export default removeFriend;
