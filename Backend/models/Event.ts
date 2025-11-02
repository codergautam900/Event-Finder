import mongoose, { Schema, Document } from "mongoose";

export interface IEvent extends Document {
  title: string;
  description: string;
  date: Date;
  city: string;
  location: {
    type: string;
    coordinates: number[];
  };
  category: string;
  maxParticipants: number;
  createdBy: mongoose.Types.ObjectId;
}

const eventSchema = new Schema<IEvent>({
  title: { type: String, required: true },
  description: String,
  date: { type: Date, required: true },
  city: { type: String, required: true },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true
    }
  },
  category: { type: String, required: true },
  maxParticipants: { type: Number, required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true }
});

// 🔥 MongoDB ke liye 2dsphere index (geo query ke liye required)
eventSchema.index({ location: "2dsphere" });

export default mongoose.model<IEvent>("Event", eventSchema);