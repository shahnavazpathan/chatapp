import {app,io,server} from "./utils/socketIo.js"
import express from "express";
import path from 'path';
import { fileURLToPath } from "url";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();


const __filename = fileURLToPath(import.meta.url);
const  __dirname = path.dirname(__filename);
import cookieParser from "cookie-parser";

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin : 'http://localhost:1111',credentials : true}));


import authRoutes from "./routes/auth.routes.js";

import mongoose from "./dbCredentials/mongo.connection.js";
import reqRoute from "./routes/friendReq.route.js";
import protectedRoute from "./middleware/protectedRoute.js";
import chatController from "./controllers/chat-controllers/chat.controller.js";
chatController();
import forgetPasswordRoutes from "./routes/forgetPassword.route.js";

app.use("/api/auth/", authRoutes);

app.use("/api/",protectedRoute,reqRoute);
 

app.use("/api/forget-password",forgetPasswordRoutes);
 
 
server.listen(1234, (req, res) => {
  console.log("server is running at port 1234");
}); 
