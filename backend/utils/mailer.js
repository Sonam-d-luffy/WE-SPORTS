import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// Create transporter using Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // your Gmail
    pass: process.env.EMAIL_PASS, // App password if 2FA enabled
  },
});

export const sendBookingEmail = async (email, bookingDetails) => {
  try {
    // Send email
    const info = await transporter.sendMail({
      from: `"We Sports" <${process.env.EMAIL_USER}>`, // sender
      to: email, // for testing, send to yourself
      subject: "🎮 Slot Booking Confirmation",
      html: `
        <h2>Booking Confirmed!</h2>
        <p>Hi ${bookingDetails.name},</p>
        <p>You have successfully booked a slot for <b>${bookingDetails.gameName}</b>.</p>
        <p><b>Date:</b> ${bookingDetails.date}</p>
        <p><b>Time:</b> ${bookingDetails.time}</p>
        <p><b>Tournament:</b> ${bookingDetails.tournamentName}</p>
        <p>You can get updates here:</p>
        <a href="${bookingDetails.link}" 
           style="display:inline-block;padding:10px 15px;background:#4CAF50;color:#fff;
                  text-decoration:none;border-radius:5px;font-weight:bold;">
          JOIN WHATSAPP COMMUNITY
        </a>
        <br/>
        <p>We’ll see you there! 🎉</p>
      `,
    });

    //console.log("✅ Booking email sent:", info.response);
  } catch (error) {
    console.error("❌ Error sending booking email:", error.message);
  }
};
