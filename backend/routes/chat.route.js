import express from "express";
import chatContoller from "../controllers/chat-controllers/chat.controller.js";
const route = express.Router();

route.post('/chat', chatContoller);

export default route;
