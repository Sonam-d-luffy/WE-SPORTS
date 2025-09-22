import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// Create a transporter using Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // your Gmail
    pass: process.env.EMAIL_PASS, // App password if 2FA enabled
  },
});

export const sendEmailOTP = async (email, otp) => {
  try {
    // Send email
    const info = await transporter.sendMail({
      from: `"We Sports" <${process.env.EMAIL_USER}>`, // sender address
      to: email, // send to yourself for testing
      subject: "We Sports Signup OTP",
      html: `<p>Your OTP is <b>${otp}</b>. It will expire in 2 minutes.</p>`,
    });

    console.log("✅ OTP email sent:", info.response);
  } catch (error) {
    console.error("❌ Error sending OTP email:", error.message);
  }
};
