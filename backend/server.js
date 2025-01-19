import express from "express";
const app = express();

import dotenv from "dotenv";
dotenv.config();

import cookieParser from "cookie-parser";

app.use(express.json());
app.use(cookieParser());


import authRoutes from "./routes/auth.routes.js";

import mongoose from "./dbCredentials/mongo.connection.js";
import reqRoute from "./routes/friendReq.route.js";
import protectedRoute from "./middleware/protectedRoute.js";

app.use("/api/auth/", authRoutes);

app.use("/api/",protectedRoute,reqRoute);


app.listen(1234, (req, res) => {
  
  console.log("server is running at port 1234");
}); 
