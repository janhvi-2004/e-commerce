import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
    // You can add more default headers here if needed
  },
});

export default axiosInstance;
