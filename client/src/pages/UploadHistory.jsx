import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UploadHistory = () => {
  const [records, setRecords] = useState([]);

  const fetchHistory = async () => {
    const token = localStorage.getItem('token');
    const res = await axios.get('http://localhost:5000/api/upload/history', {
      headers: { Authorization: token }
    });
    setRecords(res.data);
  };

  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    await axios.delete('http://localhost:5000/api/upload/delete', {
      headers: { Authorization: token }
    });
    fetchHistory();
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">📄 Upload History</h2>
      <button
        onClick={handleDelete}
        className="bg-red-600 text-white px-4 py-2 mb-4 rounded"
      >
        Delete All Records
      </button>
      <div className="overflow-x-auto border rounded shadow">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              {records[0] &&
                Object.keys(records[0]).map((key, idx) => (
                  <th key={idx} className="px-4 py-2 border">{key}</th>
                ))}
            </tr>
          </thead>
          <tbody>
            {records.map((row, i) => (
              <tr key={i} className="even:bg-gray-50">
                {Object.values(row).map((cell, j) => (
                  <td key={j} className="px-4 py-2 border">{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UploadHistory;
