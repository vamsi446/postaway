import { UserRepository } from "./user.repository.js";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
export class UserController {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async signUp(req, res, next) {
    const { name, email, password, gender } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = await this.userRepository.signUp({
        name: name,
        email: email,
        password: hashedPassword,
        gender: gender,
      });
      res.status(201).send(user);
    } catch (err) {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(400).send({
          success: false,
          message: "Validation error: " + err.message,
        });
      } else {
        res.status(400).send({ success: false, error: err.message });
      }
    }
  }
  async signIn(req, res, next) {
    try {
      // 1. Find user by email.
      const user = await this.userRepository.signIn(req.body.email);
      if (!user) {
        return res.status(400).send("Incorrect Credentials");
      } else {
        // 2. Compare password with hashed password.
        console.log(req.body.password, user.password);
        const result = await bcrypt.compare(req.body.password, user.password);

        if (result) {
          // 3. Create token.
          const token = jwt.sign(
            {
              userID: user._id,
              email: user.email,
            },
            "AIb6d35fvJM4O9pXqXQNla2jBCH9kuLz",
            {
              expiresIn: "1h",
            }
          );
          // 4. Send token.
          return res.status(200).send({ success: true, message: token });
        } else {
          return res
            .status(400)
            .send({ success: false, error: "Incorrect Credentials" });
        }
      }
    } catch (err) {
      console.log(err);
      return res.status(400).send({ success: false, error: err.message });
    }
  }

  logout = (req, res, next) => {
    res
      .clearCookie("jwtToken")
      .json({ success: true, msg: "logout successful" });
  };

  async getDetails(req, res, next) {
    try {
      const userId = req.params.userId;
      const details = await this.userRepository.getDetails(userId);
      if (details) {
        res.status(200).send({ success: true, msg: details });
      } else {
        res.status(404).send({ success: false, msg: "No Details Found " });
      }
    } catch (err) {
      console.log(err);
      res
        .status(404)
        .send({ success: false, msg: "Error while getting details" });
    }
  }

  async getAllDetails(req, res, next) {
    try {
      const details = await this.userRepository.getAllDetails();
      if (details) {
        res.status(200).send({ success: true, message: details });
      } else {
        res.status(404).send({ success: false, message: "No Users Found" });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async logoutAllDevices(req, resp, next) {
    try {
    } catch (err) {}
  }

  async updateDetails(req, res, next) {
    try {
      const userId = req.userID;
      const password = req.body.password;
      const hashedPassword = await bcrypt.hash(password, 12);
      await this.userRepository.updateDetails(userId, hashedPassword);
      res
        .status(200)
        .send({ success: true, message: "Password updated successfully" });
    } catch (err) {
      console.log(err);
    }
  }
}
