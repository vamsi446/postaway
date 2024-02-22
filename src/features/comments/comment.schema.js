import mongoose from "mongoose";
export const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Post",
  },
});
