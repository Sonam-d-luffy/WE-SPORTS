import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const sendEmailOTP = async (email, otp) => {
  try {
    await axios.post(
      "https://api.resend.com/emails",
      {
        from: process.env.RESEND_VERIFIED_EMAIL, // verified in Resend
        to: email,
        subject: "      We sports Signup OTP",
        html: `<p>Your OTP is <b>${otp}</b>. It will expire in 2 minutes.</p>`,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    //console.log("✅ OTP email sent:", response.data);
  } catch (error) {
    console.error("❌ Error sending OTP email:", error.response?.data || error.message);
  }
};
