import axios from "axios";

export const instance = axios.create({
  baseURL: "https://bukarka-p4wc.onrender.com/",
  // baseURL: "http://localhost:4000/",
});
