import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db";
import authRoutes from "./routes/authRoutes";
import eventRoutes from "./routes/eventRoutes";

dotenv.config();
process.setMaxListeners(0);

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS FIX (Vercel + Local + Future Envs)
const allowedOrigins = [
  "https://event-finder-six-fawn.vercel.app", // your Vercel frontend
  "http://localhost:5173",                   // local dev
  process.env.FRONTEND_URL || ""             // optional .env support
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.warn("❌ Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

// ✅ Connect MongoDB
connectDB();

// ✅ Base route
app.get("/", (req: Request, res: Response) => {
  res.send("🚀 Event Finder Backend (TypeScript) is Live!");
});

// ✅ API routes
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});