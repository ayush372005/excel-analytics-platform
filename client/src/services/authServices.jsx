import axios from 'axios';

const API_BASE = 'http://localhost:5000/api/auth';

export const registerUser = (formData) =>
  axios.post(`${API_BASE}/register`, formData);

export const loginUser = (formData) =>
  axios.post(`${API_BASE}/login`, formData);
