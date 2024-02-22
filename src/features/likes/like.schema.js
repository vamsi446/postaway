import mongoose from "mongoose";

export const likeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },

  targetId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: "target",
  },
  target: {
    type: String,
    required: true,
    enum: {
      values: ["Post", "Comment"],
      message: "The specified target entity (Post/Comment) was not found.",
    },
  },
});
