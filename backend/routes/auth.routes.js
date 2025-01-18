import express from "express";
import signUp from "../controllers/authControllers/signUp.controllers.js";
import signIn from "../controllers/authControllers/signIn.controllers.js";
import signOut from "../controllers/authControllers/signOut.controllers.js";

import verifyEmail from "../controllers/authControllers/verifyEmail.controller.js";

const route = express.Router();  

route.post("/signup", signUp);

route.post("/verify", verifyEmail);

route.post("/signin", signIn);
route.post("/signout", signOut);

export default route;
