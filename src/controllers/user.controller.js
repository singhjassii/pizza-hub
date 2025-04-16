import { generateOTP } from "@/lib/helper";
import User from "@/models/user.model.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

export const loginUser = async (req) => {
  try {
    const { phoneNumber } = req.body;
    const user = await User.findOne({
      where: { phoneNumber, isVerified: "yes" },
    });
    if (!user) {
      throw new Error("User not found");
    }
    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
      }
    );
    return token;
  } catch (error) {
    console.error("Error login User", error);
    throw new Error(error);
  }
};
export const signUpUser = async (req) => {
  try {
    const { name, email, phoneNumber } = req.body;
    const otpGenerated = generateOTP();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_EMAIL, // Your Gmail address
        pass: process.env.GMAIL_PASSWORD, // Your Gmail password or App password if 2FA is enabled
      },
    });
    // Send email
    await transporter.sendMail({
      from: process.env.GMAIL_EMAIL, // Sender address
      to: email, // Receiver address
      subject: "Hello From Pizza Hub", // Subject line
      text: `OTP Generated: ${otpGenerated}`,
    });
    const alreadyUser = await User.findOne({ where: { email } });
    if (alreadyUser) {
      if (alreadyUser.isVerified === "yes") {
        throw new Error("Already signed up!");
      }
      await alreadyUser.update({ otp: otpGenerated });
    } else {
      await User.create({
        name,
        phoneNumber,
        email,
        otp: otpGenerated,
      });
    }
    return "OTP sent successfully";
  } catch (error) {
    console.error("Error login User", error);
    throw new Error(error);
  }
};
export const verifyOtp = async (req) => {
  try {
    const { otp, email } = req.body;
    const user = await User.findOne({ where: { email } });
    if (otp === user.otp) {
      await user.update({ otp, isVerified: "yes" });
      const token = jwt.sign(
        {
          id: user.id,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
      );
      return token;
    }
  } catch (error) {
    console.error("Error login User", error);
    throw new Error(error);
  }
};
export const checkAuth = async (req) => {
  try {
    const { token } = req.body;

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const currentDate = Math.round(Date.now() / 1000);
    if (decodedToken?.exp < currentDate) {
      throw new Error("Token Expired Login Again");
    }
    const user = await User.findByPk(decodedToken.id, {
      attributes: ["id", "name", "email", "phoneNumber"],
      raw: true,
    });
    return user;
  } catch (error) {
    console.error("Error Getting User Details", error);
    throw new Error(error);
  }
};
