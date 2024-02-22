import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

const baseUrl = process.env.MONGODB;

export const connectToDb = async () => {
  try {
    console.log(baseUrl);
    await mongoose.connect(`${baseUrl}/postAway`);
    console.log("MongoDB connected using mongoose");
  } catch (err) {
    console.log(err);
  }
};
