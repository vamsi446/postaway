import express from "express";
import { upload } from "../../middlewares/fileupload.middleware.js";
import {
  getPostsForUser,
  getPostsByPostId,
  getAllPosts,
  createNewPost,
  deletePost,
  updatePost,
} from "./post.controller.js";
import jwtAuth from "../../middlewares/jwt.middleware.js";
const postsRouter = express.Router();
postsRouter.post("/", upload.single("imageUrl"), createNewPost);
postsRouter.get("/all", getAllPosts); // Move this route up
postsRouter.get("/:postId", getPostsByPostId); // Keep this route after the more specific one
postsRouter.get("/", getPostsForUser);
postsRouter.delete("/:postId", deletePost);
postsRouter.put("/:postId", upload.single("imageUrl"), updatePost);

export default postsRouter;
