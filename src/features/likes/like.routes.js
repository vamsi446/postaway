import express from "express";
import { getLikes, toggleLike } from "./like.controller.js";
const likeRouter = express.Router();

likeRouter.post("/:id", getLikes);
likeRouter.get("/toggle/:id", toggleLike);
export default likeRouter;
