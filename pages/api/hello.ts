import axios from "axios";

export const api2 = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': '*/*',
  },
});