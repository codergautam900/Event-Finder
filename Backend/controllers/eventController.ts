import { Request, Response } from "express";
import Event from "../models/Event";
import mongoose from "mongoose";

// 🧭 Helper: Calculate distance between two coordinates (in KM)
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // Radius of Earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// ✅ Create Event
export const createEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      title,
      description,
      date,
      city,
      latitude,
      longitude,
      category,
      maxParticipants,
    } = req.body;

    if (!latitude || !longitude) {
      res.status(400).json({ message: "Latitude and longitude are required" });
      return;
    }

    const event = await Event.create({
      title,
      description,
      date,
      city,
      category,
      maxParticipants,
      location: {
        type: "Point",
        coordinates: [longitude, latitude],
      },
      createdBy: new mongoose.Types.ObjectId("672bc6f6d4e5abfa4f4cc123"), // test user id
    });

    res.status(201).json({ message: "Event created successfully", event });
  } catch (error: any) {
    console.error("Create Event Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// ✅ Get All Events
export const getAllEvents = async (_req: Request, res: Response): Promise<void> => {
  try {
    const events = await Event.find();
    res.status(200).json({ count: events.length, events });
  } catch (error: any) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// ✅ Filter Events (Advanced)
export const filterEvents = async (req: Request, res: Response): Promise<void> => {
  try {
    const { latitude, longitude, distance = 50, category, city, date } = req.query;

    // Convert to numbers properly
    const latNum = parseFloat(latitude as string);
    const lonNum = parseFloat(longitude as string);
    const distLimit = parseFloat(distance as string);

    const filters: any = {};
    if (category) filters.category = category;
    if (city) filters.city = { $regex: city, $options: "i" };
    if (date) filters.date = { $gte: new Date(date as string) };

    const allEvents = await Event.find(filters);

    const filtered = allEvents
      .map((event) => {
        const [lon, lat] = event.location.coordinates; // [longitude, latitude]

        let dist = null;
        if (!isNaN(latNum) && !isNaN(lonNum)) {
          dist = calculateDistance(latNum, lonNum, lat, lon);
        }

        return { ...event.toObject(), distance: dist };
      })
      .filter(
        (e) =>
          e.distance === null || e.distance <= distLimit
      )
      .sort((a, b) => (a.distance ?? 0) - (b.distance ?? 0));

    res.status(200).json({
      count: filtered.length,
      events: filtered.map((ev) => ({
        ...ev,
        distance: ev.distance !== null ? `${ev.distance.toFixed(2)} km `: null,
      })),
    });
  } catch (error: any) {
    console.error("Filter Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// ✅ Get Event by ID
export const getEventById = async (req: Request, res: Response): Promise<void> => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      res.status(404).json({ message: "Event not found" });
      return;
    }
    res.status(200).json(event);
  } catch (error: any) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// ✅ Update Event
export const updateEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedEvent) {
      res.status(404).json({ message: "Event not found" });
      return;
    }
    res.status(200).json({ message: "Event updated", updatedEvent });
  } catch (error: any) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// ✅ Delete Event
export const deleteEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) {
      res.status(404).json({ message: "Event not found" });
      return;
    }
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};