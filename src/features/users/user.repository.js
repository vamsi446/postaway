import mongoose from "mongoose";
import { userSchema } from "./user.schema.js";
import { ApplicationError } from "../../error-handler/applicationError.js";
import { customErrorHandler } from "../../../../17. Working with Mongoose - II/problem 4/problem/src/middlewares/errorHandler.js";
const UserModel = new mongoose.model("User", userSchema);
export class UserRepository {
  async signUp(user) {
    try {
      console.log(user);
      // create instance of model.
      const newUser = new UserModel(user);
      await newUser.save();
      return newUser;
    } catch (err) {
      console.log(err);
      if (err instanceof mongoose.Error.ValidationError) {
        throw err;
      } else {
        console.log(err);
        throw err;
      }
    }
  }
  async signIn(email) {
    try {
      return await UserModel.findOne({ email });
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }

  async getDetails(userId) {
    try {
      const user = await UserModel.findById(userId);
      if (user) {
        return { name: user.name, email: user.email, gender: user.gender };
      }
    } catch (err) {
      throw new err();
    }
  }

  async getAllDetails() {
    try {
      const details = await UserModel.aggregate([
        { $project: { _id: 1, name: 1, email: 1, gender: 1 } },
      ]);
      return details;
    } catch (err) {
      console.log(err);
    }
  }

  async updateDetails(id, password) {
    try {
      const user = await UserModel.findById(id);
      if (user) {
        user.password = password;
        await user.save();
      } else {
        return "no user found";
      }
    } catch (err) {
      throw err;
    }
  }
}
