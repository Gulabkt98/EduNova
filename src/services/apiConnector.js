// // src/services/apiConnector.js
import axios from "axios";

// Create a configured Axios instance
export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL, // e.g. http://localhost:4000/api/v1
  withCredentials: true, // send/receive cookies for cross-origin requests
});

// Optional: attach Authorization header if token exists (Bearer JWT flow)
axiosInstance.interceptors.request.use((config) => {
  let token = window.localStorage.getItem("token");
  if (token) {
    try {
      // Remove any quotes from the token
      token = JSON.parse(token);
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    } catch (error) {
      console.log("Token parsing error:", error);
      // If token is invalid, remove it
      window.localStorage.removeItem("token");
    }
  }
  return config;
});

// apiConnector wrapper
export const apiConnector = (method, url, bodyData, headers, params) => {
  return axiosInstance({
    method,
    url,
    data: bodyData ?? null,
    headers: headers ?? {},
    params: params ?? {},
  });
};
