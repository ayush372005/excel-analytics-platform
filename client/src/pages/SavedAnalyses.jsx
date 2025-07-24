import React, { useEffect, useState } from 'react';
import axios from '../api/axios';

import { jwtDecode } from 'jwt-decode';

const SavedAnalyses = () => {
  const [analyses, setAnalyses] = useState([]);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      setUserEmail(decoded.email || 'User');
    }
    fetchAnalyses();
  }, []);

  const fetchAnalyses = async () => {
    try {
      const token = localStorage.getItem('token');
const res = await axios.get('/api/analyses', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAnalyses(res.data);
    } catch (err) {
      console.error('Failed to fetch saved analyses', err);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">📁 Saved Analyses</h1>
      {analyses.length === 0 ? (
        <p className="text-gray-600">No saved analyses found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {analyses.map((a, idx) => (
            <div key={idx} className="bg-white p-4 rounded shadow">
              <h2 className="text-lg font-semibold mb-2">Analysis #{idx + 1}</h2>
              <p><strong>X-Axis:</strong> {a.xAxis}</p>
              <p><strong>Y-Axis:</strong> {a.yAxis}</p>
              <p><strong>Chart Type:</strong> {a.chartType}</p>
              <p><strong>Conclusion:</strong> {a.conclusion || 'No conclusion saved.'}</p>
              <p className="text-sm text-gray-400 mt-2">Saved by: {userEmail}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedAnalyses;
