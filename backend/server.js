import express from "express";
const app = express();

import dotenv from "dotenv";
dotenv.config();

import cookieParser from "cookie-parser";

app.use(express.json());
app.use(cookieParser());


import authRoutes from "./routes/auth.routes.js";


import mailRoute from "./routes/mail.route.js";
import mongoose from "./dbCredentials/mongo.connection.js";
import connectToDB from "./dbCredentials/mongo.connection.js";

app.use("/api/auth/", authRoutes);
app.use("/api/",mailRoute);

app.listen(1234, (req, res) => {
  connectToDB();
  console.log("server is running at port 1234");
});
