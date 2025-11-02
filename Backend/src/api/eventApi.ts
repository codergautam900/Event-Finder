import api from "./axios";

export const getAllEvents = async () => {
  const res = await api.get("/events");
  return res.data;
};

export const filterEvents = async (params: {
  latitude?: number;
  longitude?: number;
  distance?: number;
  category?: string;
  city?: string;
  date?: string;
}) => {
  const res = await api.get("/events/filter", { params });
  return res.data;
};