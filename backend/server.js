import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// CORS
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
import hostLogin from "./routes/hostLogin.js";
import gamerLogin from "./routes/gamerLogin.js";
import gameRoute from "./routes/gameRoute.js";
import booking from "./routes/slotbook.js";
import verify from "./routes/verification.js";

// --------------------- API Routes ---------------------
app.use("/api/host-auth", hostLogin);
app.use("/api/gamer-auth", gamerLogin);
app.use("/api/games", gameRoute);
app.use("/api/booking", booking);
app.use("/api/verify", verify);


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const frontendPath = path.join(__dirname, "dist");
app.use(express.static(frontendPath));

// Only serve React for non-API routes
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
