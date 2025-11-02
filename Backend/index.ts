import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db";
import authRoutes from "./routes/authRoutes";
import eventRoutes from "./routes/eventRoutes";

dotenv.config();
process.setMaxListeners(0);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.send("🚀 Event Finder Backend is Live!");
});

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));