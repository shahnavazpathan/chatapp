import express from "express";
import sendReq from "../controllers/friend-requests-controllers/sendReq.controller";

const route = express.Router();

route.post('/sendreq',sendReq);
route.post('/getreq',getReq);
