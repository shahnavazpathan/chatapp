import express from "express";
import sendReq from "../controllers/friend-requests-controllers/sendReq.controller.js";
import getReq from "../controllers/friend-requests-controllers/getReq.controller.js";
import acceptReq from "../controllers/friend-requests-controllers/acceptReq.controller.js";
import rejectReq from "../controllers/friend-requests-controllers/rejectReq.controller.js";

const route = express.Router();

route.post('/sendreq',sendReq);
route.post('/getreq',getReq);
route.post('/acceptreq',acceptReq);
route.post('/rejectreq',rejectReq);

export default route;