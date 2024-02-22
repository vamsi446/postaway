import nodemailer from "nodemailer";
import * as otpGenerator from "otp-generator";
import otpSchema from "./otp.schema.js";
import mongoose from "mongoose";
const OtpModel = new mongoose.model("OTP", otpSchema);
const transporter = nodemailer.createTransport({
  // Set up your email configuration
  service: "gmail",
  auth: {
    user: "your@gmail.com",
    pass: "password",
  },
});

export class OTPRepository {
  async sendOTP(email) {
    const otp = otpGenerator.generate(6, {
      digits: true,
      alphabets: false,
      upperCase: false,
      specialChars: false,
    });

    console.log(otp);
    const mailOptions = {
      from: "your@gmail.com",
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is: ${otp}`,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent: ", info.response);
      if (info && info.response) {
        const otpObj = new OtpModel({ email: email, otp: otp });
        otpObj.save();
        return { success: true, message: "OTP sent successfully." };
      } else {
        return { success: false, message: "unable to send OTP at the moment." };
      }
    } catch (error) {
      throw error;
    }
  }
  async verifyOtp(email, otp) {
    try {
      const otpObj = await OtpModel.find({ email: email, otp: otp });
      if (otpObj) {
        return { success: true, message: "otp verified successfully." };
      } else {
        return { success: false, message: "otp expired. please try again" };
      }
    } catch (err) {
      throw err;
    }
  }
}
