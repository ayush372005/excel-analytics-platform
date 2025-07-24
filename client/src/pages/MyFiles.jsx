// client/src/pages/MyFiles.jsx
import React, { useEffect, useState } from 'react';
import axios from '../api/axios'; // ✅ Use custom axios

const MyFiles = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/excel/data', {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Optional: remove _id, __v, userId, etc.
        const cleaned = res.data.map(({ _id, __v, userId, ...rest }) => rest);
        setRecords(cleaned);
      } catch (err) {
        console.error('Fetch error:', err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">📁 My Files</h1>

      {records.length === 0 ? (
        <p className="text-gray-500">No files found.</p>
      ) : (
        <div className="overflow-auto">
          <table className="w-full table-auto border border-gray-300 rounded">
            <thead>
              <tr className="bg-gray-200 text-sm">
                {Object.keys(records[0]).map((header, i) => (
                  <th key={i} className="p-2 border border-gray-300">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {records.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  {Object.values(row).map((val, j) => (
                    <td key={j} className="p-2 border border-gray-300 text-sm">
                      {typeof val === 'object' ? JSON.stringify(val) : val}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyFiles;
