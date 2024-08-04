// src/services/axios.js
import axios from 'axios';

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Sin duplicar '/api'
  withCredentials: true,
});

export default client;

