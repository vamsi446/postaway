import { CommentRepository } from "./comment.repository.js";
import { PostsRepository } from "../posts/post.repository.js";
const commentRepo = new CommentRepository();
const postRepo = new PostsRepository();
export const addComment = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const content = req.body.content;
    const userId = req.userID;
    if (postRepo.getPostsByPostId(postId)) {
      const comment = await commentRepo.addComment(postId, userId, content);
      if (comment) {
        res.status(200).send({ success: true, message: comment });
      } else {
        res.status(400).send({ success: false, msg: "Unable to add comment" });
      }
    } else {
      res.status(404).send({ success: false, msg: "No post found" });
    }
  } catch (err) {
    console.log(err);
    res
      .status(404)
      .send({ success: false, msg: "Unable to add comment at the moment" });
  }
};

export const updateComment = async (req, res, next) => {
  try {
    const commentId = req.params.commentId;
    const content = req.body.content;
    const isComment = await commentRepo.getComment(commentId);
    console.log(isComment);
    if (isComment) {
      const comment = await commentRepo.updateComment(commentId, content);
      if (comment) {
        res.status(200).send({ success: true, message: comment });
      } else {
        res.status(400).send({ success: true, message: "comment not updated" });
      }
    } else {
      res.status(404).send({
        success: false,
        message: "No Comment found with the provided id",
      });
    }
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Comment cannot be updated at the moment",
    });
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    const commentId = req.params.commentId;
    const deletedCount = await commentRepo.deleteComment(commentId);
    console.log(deletedCount);
    if (deletedCount.deletedCount == 1) {
      res
        .status(200)
        .send({ success: true, message: "comment deleted succesfully." });
    } else {
      res.status(404).send({
        success: false,
        message: "comment not deleted",
      });
    }
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Comment cannot be deleted at the moment",
    });
  }
};

export const getComments = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const comments = await commentRepo.getComments(postId);
    if (comments) {
      res.status(200).send({ success: true, message: comments });
    } else {
      res.status(404).send({
        success: false,
        message: "unable to get comments for the post",
      });
    }
  } catch (e) {
    res.status(404).send({ success: false, message: "unable to get comments" });
  }
};
