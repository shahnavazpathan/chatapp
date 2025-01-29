import express from "express";

import sendOtpForgPass from "../controllers/authControllers/forget-password/sendOtpForgetPassword.controller.js";
import verifyPassword from "../controllers/authControllers/forget-password/verifyPassword.controller.js";
import resetPassword from "../controllers/authControllers/forget-password/resetPassword.controller.js";

const route = express.Router();

route.post("/send-otp", sendOtpForgPass);
route.post("/verify", verifyPassword);
route.post("/reset", resetPassword);

export default route;
