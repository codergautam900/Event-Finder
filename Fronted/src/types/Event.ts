export interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  category?: string;
  banner?: string;

  // ✅ Location structure (MongoDB GeoJSON ke hisaab se)
  city?: string;
  location?: {
    type: "Point";
    coordinates: [number, number]; // [longitude, latitude]
  };

  currentParticipants: number;
  maxParticipants: number;
  createdAt?: string;
  updatedAt?: string;
}