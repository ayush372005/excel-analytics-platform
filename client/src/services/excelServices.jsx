import axios from 'axios';

const API_BASE = 'http://localhost:5000/api/excel';

export const uploadExcelFile = (file, token) => {
  const formData = new FormData();
  formData.append('file', file);

  return axios.post(`${API_BASE}/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getExcelData = (token) =>
  axios.get(`${API_BASE}/data`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteExcelRecords = (token) =>
  axios.delete(`${API_BASE}/delete`, {
    headers: { Authorization: `Bearer ${token}` },
  });
