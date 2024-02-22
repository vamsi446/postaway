import { OTPRepository } from "./otp.repository.js";

const otpRepo = new OTPRepository();
export const sendOtp = async (req, res, next) => {
  try {
    const email = req.body.email;
    const result = await otpRepo.sendOTP(email);
    if (result && result.success) {
      res.status(200).send(result);
    } else {
      res.status(400).send(result);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ success: false, message: "Unable to send OTP" });
  }
};

export const verifyOtp = async (req, res, next) => {
  try {
    const { otp, email } = req.body;
    const result = await otpRepo.verifyOtp(email, otp);
    if (result.success) {
      res.status(200).send(result);
    } else {
      res.status(400).send(result);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ success: false, message: "unable to verify OTP" });
  }
};
