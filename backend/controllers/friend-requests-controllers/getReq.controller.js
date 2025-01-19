import User from "../../models/users.model.js";

const getReq = async (req, res) => {
  try {
    const reqArr = await User.findOne({ _id: req.userId }).select("friendReqs");
    return res.status(200).json({ friendRequests: reqArr });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export default getReq;
