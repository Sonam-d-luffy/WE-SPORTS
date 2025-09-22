import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const sendBookingEmail = async (email, bookingDetails) => {
  try {
    console.log("Sending booking email to:", email);

    const response = await axios.post(
      "https://api.resend.com/emails",
      {
        from:  "We Sports <onboarding@resend.dev>", // must be verified in Resend
        to: email,
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
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ Booking email sent:", response.data);
  } catch (error) {
    console.error("❌ Error sending booking email:", error.response?.data || error.message);
  }
};
