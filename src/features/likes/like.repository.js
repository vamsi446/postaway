import mongoose from "mongoose";
import { likeSchema } from "./like.schema.js";
import { PostsRepository } from "../posts/post.repository.js";
import { CommentRepository } from "../comments/comment.repository.js";

const commentRepo = new CommentRepository();
const postRepo = new PostsRepository();

const LikeModel = new mongoose.model("Like", likeSchema);
export class LikeRepository {
  getLikes = async (id) => {
    try {
      const likes = LikeModel.find({ targetId: id });
      return likes;
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  toggleLike = async (userId, id, type) => {
    try {
      const likeExists = await LikeModel.find({ userId: userId, targetId: id });
      if (likeExists && likeExists.length > 0) {
        //delete like
        const idType = likeExists.target;
        const deleteCount = await LikeModel.deleteOne({
          userId: userId,
          targetId: id,
          target: type,
        });
        if (deleteCount) {
          return {
            message: "Deleted",
            res: { idType: idType, deletedCount: deleteCount.deletedCount },
          };
        } else {
          throw new Error();
        }
      } else {
        ///add like
        const post = await postRepo.getPostsByPostId(id);
        const comment = await commentRepo.getComment(id);
        if ((post && type == "Post") || (comment && type == "Comment")) {
          const like = new LikeModel({
            userId: userId,
            targetId: id,
            target: type,
          });
          await like.save();
          return { message: "Added", res: { like: like } };
        } else {
          return { message: "Invalid" };
        }
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
}
