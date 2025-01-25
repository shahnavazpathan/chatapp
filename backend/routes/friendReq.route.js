import express from "express";
import sendReq from "../controllers/friend-requests-controllers/sendReq.controller.js";
import getReq from "../controllers/friend-requests-controllers/getReq.controller.js";
import removeFriend from "../controllers/friend-requests-controllers/rmvFrd.controller.js";
import resToReq from "../controllers/friend-requests-controllers/resToReq.controller.js";

const route = express.Router();

route.post('/sendreq',sendReq);
route.post('/getreq',getReq);
route.post('/restoreq',resToReq);
route.post('/removefriend',removeFriend);

export default route;