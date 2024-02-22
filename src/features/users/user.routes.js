import express from "express";
import { UserController } from "./user.controller.js";
import jwtAuth from "../../middlewares/jwt.middleware.js";
const userRouter = express.Router();
const controller = new UserController();
userRouter.post("/signup", (req, resp, next) => {
  controller.signUp(req, resp, next);
});
userRouter.post("/signin", (req, resp, next) => {
  controller.signIn(req, resp, next);
});
userRouter.get("/logout", (req, resp, next) => {
  controller.logout(req, resp, next);
});
userRouter.get("/logout-all-devices", (req, resp, next) => {
  controller.signOutAllDevices(req, resp, next);
});
userRouter.get("/get-details/:userId", jwtAuth, (req, resp, next) => {
  controller.getDetails(req, resp, next);
});
userRouter.get("/get-all-details/", jwtAuth, (req, resp, next) => {
  controller.getAllDetails(req, resp, next);
});
userRouter.put("/update-details/:userId", jwtAuth, (req, resp, next) => {
  controller.updateDetails(req, resp, next);
});

export default userRouter;
