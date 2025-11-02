import express from "express";
import {
  createEvent,
  getAllEvents,
  filterEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} from "../controllers/eventController";

const router = express.Router();

router.get("/filter", filterEvents);
router.get("/", getAllEvents);
router.post("/", createEvent);
router.get("/:id", getEventById);
router.put("/:id", updateEvent);
router.delete("/:id", deleteEvent);

export default router;