// server.js
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

// Load environment variables
dotenv.config();

// Express setup
const app = express();

// CORS setup
const allowedOrigins = [
  process.env.FRONTEND_URL?.trim().replace(/\/$/, ""),
  process.env.FRONTEND_URL_LOCAL?.trim().replace(/\/$/, "")
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    const cleanOrigin = origin.replace(/\/$/, "");
    if (allowedOrigins.includes(cleanOrigin)) return callback(null, true);
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true
}));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
import hostLogin from "./routes/hostLogin.js";
import gamerLogin from "./routes/gamerLogin.js";
import gameRoute from "./routes/gameRoute.js";
import booking from "./routes/slotbook.js";
import verify from "./routes/verification.js";
import pincodeRoutes from "./routes/pincode.js";

// API routes
app.use("/api/host-auth", hostLogin);
app.use("/api/gamer-auth", gamerLogin);
app.use("/api/games", gameRoute);
app.use("/api/booking", booking);
app.use("/api/verify", verify);
app.use("/api", pincodeRoutes);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", time: new Date() });
});

// React frontend serving (optional)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendPath = path.join(__dirname, "dist"); // Vite build folder
app.use(express.static(frontendPath));
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// MongoDB connection
if (!process.env.MONGO_URL) {
  console.error("❌ MONGO_URL not defined!");
  process.exit(1);
}

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("✅ Database connected"))
  .catch(err => console.error("❌ Database connection error:", err));

// Start server — Railway injects PORT automatically
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
