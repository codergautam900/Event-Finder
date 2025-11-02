// models/userModel.ts

import mongoose, { Schema, Document } from "mongoose";

// Interface: defines TypeScript type for a user
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

// Mongoose schema for user collection
const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true } // adds createdAt & updatedAt fields automatically
);

// Export model for use in controllers
export default mongoose.model<IUser>("User", userSchema);