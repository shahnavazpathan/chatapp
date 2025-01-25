import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 8,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    friendReqs: {
      type: [Schema.Types.ObjectId],
      ref: "users",
    },
    friends: {
      type: [Schema.Types.ObjectId],
      ref: "users",
    },
    conversations : {
      type : [Schema.Types.ObjectId],
      ref : "conversations",
    },
    lastOnline : {
      type : Date,
    }
  },
  { timestamps: true }
);
const User = mongoose.model("users", userSchema);

export default User;
