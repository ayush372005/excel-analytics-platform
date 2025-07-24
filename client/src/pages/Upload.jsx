import React, { useState } from 'react';

const Upload = () => {
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      setLoading(true);
      setError('');
      setData([]);

      const token = localStorage.getItem('token');
      const res = await fetch('https://excel-analytics-platform-esrh.onrender.com/api/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await res.json();
      if (res.ok) {
        setData(result.data);
      } else {
        setError(result.error || 'Upload failed.');
      }
    } catch (err) {
      console.error(err);
      setError('Upload error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">📤 Upload Excel File</h2>

      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileChange}
        className="mb-4 block"
      />
      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        disabled={loading || !file}
      >
        {loading ? 'Uploading...' : 'Upload'}
      </button>

      {error && <p className="text-red-600 mt-4">{error}</p>}

      {data.length > 0 && (
        <div className="mt-6 overflow-x-auto">
          <h3 className="text-lg font-semibold mb-2">📊 Parsed Excel Data</h3>
          <table className="table-auto w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                {Object.keys(data[0]).map((key) => (
                  <th key={key} className="border px-3 py-2 text-left">{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, idx) => (
                <tr key={idx} className="even:bg-gray-50">
                  {Object.values(row).map((val, i) => (
                    <td key={i} className="border px-3 py-2">{val}</td>
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

export default Upload;
