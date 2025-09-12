import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  tournamentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tournament",
    required: true,
  },
  gameId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
    gamerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Gamer",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "success", "failed"],
    default: "pending",
  },
  paymentId: {
    type: String, // For Razorpay/Stripe, or UPI order reference if available
  },
  transactionId: {
    type: String, // ✅ UPI Transaction ID entered by user
  },
  paymentLink: {
    type: String, // ✅ UPI link generated
  },
  qrCode: {
    type: String, // ✅ Base64 QR Code image
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  rank: {
    type: String,
    required: true,
    enum: [
      "none",
      "bronze",
      "silver",
      "gold",
      "platinum",
      "diamond",
      "crown",
      "ace",
      "aceMaster",
      "aceDominator",
      "conqueror",
    ],
  },
  username: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  instaId: {
    type: String,
    required: true,
  },
});

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
