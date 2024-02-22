// otpModel.js
import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300, // Set the expiration time (in seconds) for the OTP, e.g., 5 minutes
  },
});

export default otpSchema;
