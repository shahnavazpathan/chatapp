import User from "../../models/users.model.js";

const acceptReq = async (req, res) => {
  try {
    let { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ message: "Please provide userId!" });
    }
    await User.updateOne({ _id: req.userId },{$pop : {friendReqs : [userId]}});
    await User.updateOne({ _id: req.userId },{$push : {friends : [userId]}});
    return res.status(200).json({ message : "Request accepted successfully!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export default acceptReq;
