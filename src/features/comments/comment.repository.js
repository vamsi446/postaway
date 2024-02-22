import mongoose from "mongoose";
import { commentSchema } from "./comment.schema.js";
import { PostsRepository } from "../posts/post.repository.js";
const CommentModel = new mongoose.model("Comment", commentSchema);
const postRepo = new PostsRepository();

export class CommentRepository {
  async addComment(postId, userId, content) {
    try {
      const comment = new CommentModel({
        content: content,
        userId: userId,
        postId: postId,
      });
      await comment.save();
      const post = await postRepo.getPostsByPostId(postId);
      if (post) {
        post.comments.push(comment);
        await post.save();
        return comment;
      } else {
        throw new Error();
      }
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
  async updateComment(commentId, content) {
    try {
      const comment = await CommentModel.findById(commentId);
      comment.content = content;
      await comment.save();
      return comment;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async getComment(commentId) {
    try {
      const comment = await CommentModel.findById(commentId);
      return comment;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async deleteComment(commentId) {
    try {
      const deletedCount = await CommentModel.deleteOne({ _id: commentId });
      return deletedCount;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
  async getComments(postId) {
    try {
      const comments = await CommentModel.find({ postId: postId });
      return comments;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
