
import nodemailer from "nodemailer";
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
export const sendBookingEmail = async (email, bookingDetails) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "🎮 Slot Booking Confirmation",
    html: `
      <h2>Booking Confirmed!</h2>
      <p>Hi ${bookingDetails.name},</p>
      <p>You have successfully booked a slot for <b>${bookingDetails.gameName}</b>.</p>
      <p><b>Date:</b> ${bookingDetails.date}</p>
      <p><b>Time:</b> ${bookingDetails.time}</p>
      <p><b>Tournament:</b> ${bookingDetails.tournamentName}</p>
        <p>You can get updates here </p>
      <a href="${process.env.CLIENT_URL}" 
         style="display:inline-block;padding:10px 15px;background:#4CAF50;color:#fff;
                text-decoration:none;border-radius:5px;font-weight:bold;">
        JOIN WHATSAPP COMMUNITY
      </a>
      <br/>
      <p>We’ll see you there! 🎉</p>
    `,
  });
};
