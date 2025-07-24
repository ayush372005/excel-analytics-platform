import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import ExcelBarChart from '../components/ExcelBarChart';
import ExcelPieChart from '../components/ExcelPieChart';
import { jwtDecode } from 'jwt-decode';

const Dashboard = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [excelData, setExcelData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [xAxis, setXAxis] = useState('');
  const [yAxis, setYAxis] = useState('');
  const [chartType, setChartType] = useState('bar');
  const [userEmail, setUserEmail] = useState('');

  const BASE_URL = 'https://excel-analytics-platform-esrh.onrender.com';

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/login');
    try {
      const decoded = jwtDecode(token);
      setUserEmail(decoded.email || 'User');
    } catch (err) {
      console.error('Invalid token');
      navigate('/login');
    }
  }, [navigate]);

  const fetchExcelData = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${BASE_URL}/api/excel/data`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExcelData(res.data);
      if (res.data.length > 0) {
        const keys = Object.keys(res.data[0]);
        setHeaders(keys);
        setXAxis(keys[0]);
        setYAxis(keys[1] || keys[0]);
      }
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  useEffect(() => {
    fetchExcelData();
  }, []);

  const handleUpload = async () => {
    if (!file) return alert('Please select a file');
    const formData = new FormData();
    formData.append('file', file);
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${BASE_URL}/api/excel/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      fetchExcelData();
    } catch (err) {
      console.error('Upload error:', err);
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${BASE_URL}/api/excel/delete`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExcelData([]);
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          📊 Excel Analytics
        </h2>
        <nav className="flex flex-col gap-3">
          <Link to="/dashboard" className="bg-blue-500 text-white px-4 py-2 rounded text-left">Dashboard</Link>
          <Link to="/upload" className="text-left text-gray-700 hover:text-blue-600">Upload File</Link>
          <Link to="/files" className="text-left text-gray-700 hover:text-blue-600">My Files</Link>
          <Link to="/saved" className="text-left text-gray-700 hover:text-blue-600">Saved Analyses</Link>
          <Link to="/profile" className="text-left text-gray-700 hover:text-blue-600">Profile</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">
            Welcome, <span className="text-blue-600">{userEmail}</span>!
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        {/* Quick Summary */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">📋 Quick Summary</h2>
          <div className="bg-white p-4 rounded shadow w-48 text-center">
            <p className="text-2xl font-bold">{excelData.length}</p>
            <p className="text-gray-500 text-sm">Total Uploads</p>
          </div>
        </div>

        {/* Upload Buttons */}
        <div className="bg-white p-4 rounded shadow mb-6 flex flex-wrap gap-4 items-center">
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="border p-2 rounded"
          />
          <button
            onClick={handleUpload}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Upload
          </button>
          <button
            onClick={fetchExcelData}
            className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            View History
          </button>
          <button
            onClick={handleDelete}
            className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
          >
            Delete Records
          </button>
        </div>

        {/* Chart Controls */}
        {headers.length > 0 && (
          <div className="bg-white p-4 rounded shadow mb-6 flex flex-wrap gap-4 items-center">
            <div>
              <label className="block text-sm font-semibold mb-1">X-Axis:</label>
              <select
                value={xAxis}
                onChange={(e) => setXAxis(e.target.value)}
                className="border p-2 rounded"
              >
                {headers.map((head) => (
                  <option key={head} value={head}>
                    {head}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Y-Axis:</label>
              <select
                value={yAxis}
                onChange={(e) => setYAxis(e.target.value)}
                className="border p-2 rounded"
              >
                {headers.map((head) => (
                  <option key={head} value={head}>
                    {head}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={() => setChartType(chartType === 'bar' ? 'pie' : 'bar')}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            >
              Toggle Chart ({chartType === 'bar' ? 'Pie' : 'Bar'})
            </button>
          </div>
        )}

        {/* Chart Display */}
        <div className="bg-white p-6 rounded shadow">
          {excelData.length > 0 ? (
            chartType === 'bar' ? (
              <ExcelBarChart chartData={excelData} xAxis={xAxis} yAxis={yAxis} />
            ) : (
              <ExcelPieChart chartData={excelData} xAxis={xAxis} yAxis={yAxis} />
            )
          ) : (
            <p className="text-gray-500 text-center">No chart data available.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
