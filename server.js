import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { connectToDb } from "./src/config/db.js";
import userRouter from "./src/features/users/user.routes.js";
import postsRouter from "./src/features/posts/post.routes.js";
import jwtAuth from "./src/middlewares/jwt.middleware.js";
import loggerMiddleware from "./src/middlewares/logger.middleware.js";
import commentRouter from "./src/features/comments/comment.routes.js";
import likeRouter from "./src/features/likes/like.routes.js";
import friendshipRouter from "./src/features/friendships/friendship.routes.js";
import otpRouter from "./src/features/otps/otp.routes.js";
const app = express();
app.use(express.json());
app.use("/api/users", loggerMiddleware, userRouter);
app.use("/api/posts", jwtAuth, loggerMiddleware, postsRouter);
app.use("/api/comments", jwtAuth, loggerMiddleware, commentRouter);
app.use("/api/likes", jwtAuth, loggerMiddleware, likeRouter);
app.use("/api/friends", jwtAuth, loggerMiddleware, friendshipRouter);
app.use("/api/otp", jwtAuth, loggerMiddleware, otpRouter);

app.use("", (req, res) => {
  res.send("Invalid Path");
});

app.listen(8000, async () => {
  await connectToDb();
  console.log(`server is running at port 8000`);
});
