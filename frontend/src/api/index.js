import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5001" });
API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token
      }`;
  }
  return req;
});

export const login = (formData) => API.post("/api/user/login", formData);
export const signUp = (formData) => API.post("/api/user/signup", formData);
export const changePassword = (formData) =>
  API.post("/api/user/changePassword", formData);

export const lucky7Bet = (formData) => API.post("/api/user/lucky7/bet", formData);
export const winners = (formData) => API.get("/api/lucky7/winners", formData);