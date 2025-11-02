import express from "express";
import { signup, login } from "../controllers/authController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

// 🔒 Protected route example
router.get("/me", protect, (req, res) => {
  res.json({ message: "Welcome to your profile!", user: (req as any).user });
});

export default router;