import mongoose from "mongoose";
import User from "../../models/users.model.js";

const resToReq = async (req, res) => {
  try {
    let { userId, isAccepted } = req.body;
    if (!userId || !isAccepted) {
      return res.status(400).json({ message: "Please provide all fields!" });
    }
    if(isAccepted != "true" && isAccepted != "false") {
      return res
        .status(400)
        .json({ message: "isAccepted only accepts only true or false!" });
    }

    if (!mongoose.isValidObjectId(userId)) {
        return res.status(400).json({ message: "Please provide valid User ID!" });
      }
      const isFriends = await User.findOne({ _id: req.userId, friends: userId });

    if (isFriends) {
      return res.status(400).json({ message: "You are already friends!" });
    }
    if (isAccepted == true) {
      await User.updateOne(
        { _id: req.userId },
        { $pull: { friendReqs: userId } }
      );
      await User.updateOne({ _id: req.userId }, { $push: { friends: userId } });
      await User.updateOne({ _id: userId }, { $push: { friends: req.userId } });
      return res
        .status(200)
        .json({ message: "Request accepted successfully!" });
    }
    if (isAccepted == false) {
      await User.updateOne(
        { _id: req.userId },
        { $pull: { friendReqs: userId } }
      );

      return res
        .status(200)
        .json({ message: "Request rejected successfully!" });
    }
    return res.status(400).json({ message: "Internal server error" });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export default resToReq;
