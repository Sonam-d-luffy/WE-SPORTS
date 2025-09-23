// server.js
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

// --------------------- Load Environment ---------------------
dotenv.config(); // Railway automatically injects env vars

console.log("Loaded envs:");
//console.log("MONGO_URL:", process.env.MONGO_URL);
console.log("PORT:", process.env.PORT);

// --------------------- Express Setup ---------------------
const app = express();

// --------------------- CORS Setup ---------------------
const allowedOrigins = [
  process.env.FRONTEND_URL?.trim().replace(/\/$/, ""),
  process.env.FRONTEND_URL_LOCAL?.trim().replace(/\/$/, "")
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // server-to-server or mobile apps
    const cleanOrigin = origin.replace(/\/$/, "");
    if (allowedOrigins.includes(cleanOrigin)) {
      return callback(null, true);
    } else {
      console.error("❌ CORS blocked:", origin);
      return callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

// --------------------- Body Parsers ---------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --------------------- Import Routes ---------------------
import hostLogin from "./routes/hostLogin.js";
import gamerLogin from "./routes/gamerLogin.js";
import gameRoute from "./routes/gameRoute.js";
import booking from "./routes/slotbook.js";
import verify from "./routes/verification.js";
import pincodeRoutes from "./routes/pincode.js";

// --------------------- API Routes ---------------------
app.use("/api/host-auth", hostLogin);
app.use("/api/gamer-auth", gamerLogin);
app.use("/api/games", gameRoute);
app.use("/api/booking", booking);
app.use("/api/verify", verify);
app.use("/api", pincodeRoutes);

// --------------------- Health Check ---------------------
app.get("/health", (req, res) => {
  res.json({ status: "ok", time: new Date() });
});

// --------------------- React Frontend Serving ---------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendPath = path.join(__dirname, "dist"); // Vite build output

app.use(express.static(frontendPath));
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// --------------------- MongoDB Connection ---------------------
if (!process.env.MONGO_URL) {
  console.error("❌ MONGO_URL not defined! Make sure to set it in Railway Variables.");
  process.exit(1);
}

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("✅ Database connected"))
  .catch(err => console.error("❌ Database connection error:", err));

// --------------------- Start Server ---------------------
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
