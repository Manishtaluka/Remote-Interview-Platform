import express from 'express';
import {getstreamToken} from "../controllers/chatController.js";
import {protectRoute} from "../middleware/protectRoute.js";
const router=express.Router();
router.get("/token",protectRoute,getstreamToken);
export default router;
