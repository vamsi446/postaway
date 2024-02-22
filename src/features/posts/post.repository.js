import { postSchema } from "./post.schema.js";
import mongoose from "mongoose";
import fs from "fs";
const PostModel = new mongoose.model("Post", postSchema);
export class PostsRepository {
  createNewPost = async (userId, caption, imageUrl) => {
    try {
      const newPost = new PostModel({
        caption: caption,
        imageUrl: imageUrl,
        userId: userId,
      });
      await newPost.save();
      return newPost;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
  getPostsForUser = async (userId) => {
    try {
      const posts = await PostModel.find({ userId: userId });
      return posts;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  getPostsByPostId = async (id) => {
    try {
      const post = await PostModel.findById(id);
      return post;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  getAllPosts = async () => {
    try {
      const posts = await PostModel.find();
      return posts;
    } catch (err) {
      console.log(err.message);
      throw err;
    }
  };

  deletePost = async (postId) => {
    try {
      console.log(postId);
      const result = await PostModel.deleteOne({ _id: postId });
      return result.deletedCount;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  updatePost = async (postId, caption, fileName) => {
    try {
      const post = await PostModel.findById(postId);
      if (post) {
        const fileToDelete = post.fileName;
        fs.unlink(`./uploads/${fileName}`, (err, stats) => {
          if (err) {
            console.log(err);
          }
        });
        post.caption = caption;
        post.fileName = fileName;
        await post.save();
        return post;
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
}
