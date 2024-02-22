import express from "express";
import {
  addComment,
  updateComment,
  deleteComment,
  getComments,
} from "./comment.controller.js";
const commentRouter = express.Router();

commentRouter.post("/:postId", addComment);
commentRouter.put("/:commentId", updateComment);
commentRouter.delete("/:commentId", deleteComment);
commentRouter.get("/:postId", getComments);

export default commentRouter;
