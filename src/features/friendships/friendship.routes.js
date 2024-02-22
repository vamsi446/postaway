import express from "express";
import {
  getFriends,
  getPendingRequests,
  toggleFriendship,
  respondToFriendRequest,
} from "./friendship.controller.js";
const frienshipRouter = express.Router();

frienshipRouter.get("/get-friends/:userId", getFriends);
frienshipRouter.post("/get-pending-requests", getPendingRequests);
frienshipRouter.get("/toggle-friendship/:friendId", toggleFriendship);
frienshipRouter.get("/response-to-request/:friendId", respondToFriendRequest);
export default frienshipRouter;
