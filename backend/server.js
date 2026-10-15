// backend/server.js

import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import path from "path";

// Import routes
import chatRoutes from "./routes/chatRoutes.js";
import voiceRoutes from "./routes/voiceRoutes.js";
import rightsRoutes from "./routes/rightsRoutes.js";
import courtsRoutes from "./routes/courtsRoutes.js";
import feesRoutes from "./routes/feesRoutes.js";
import fetchRightsRoutes from "./routes/fetchRights.js"; // ✅ new route

// Import cron jobs (automation)
import "./cronJobs.js"; // ✅ ensures scheduled tasks run automatically

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Routes
app.use("/api/chat", chatRoutes);
app.use("/api/voice", voiceRoutes);
app.use("/api/rights", rightsRoutes);
app.use("/api/courts", courtsRoutes);
app.use("/api/fees", feesRoutes);
app.use("/fetch", fetchRightsRoutes); // ✅ register fetch route

// Serve frontend build (for production)
if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
}

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
