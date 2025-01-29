import jwt from "jsonwebtoken";

import User from "../models/users.model.js";

const protectedRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized User" });
    }

    const existingUser = await User.findOne({
      _id: decoded.userId,
      isVerified: true,
    });
    req.userId = decoded.userId;

    if (!existingUser) {
      return res.status(401).json({ message: "User not found" });
    }

    next();
  } catch (error) {
    console.log("Error in protected route", error);

    return res.status(500).json({ message: "Internal server error" });
  }
};

export default protectedRoute;
