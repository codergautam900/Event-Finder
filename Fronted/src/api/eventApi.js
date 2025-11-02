import api from "./axios";
export const getAllEvents = async () => {
    const res = await api.get("/events");
    return res.data;
};
export const filterEvents = async (params) => {
    const res = await api.get("/events/filter", { params });
    return res.data;
};
