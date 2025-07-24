// Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-48 bg-gray-800 text-white min-h-screen p-4 space-y-4">
      <h2 className="text-xl font-bold mb-6">📊 Dashboard</h2>
      <nav className="flex flex-col space-y-2">
        <Link to="/dashboard" className="hover:bg-gray-700 p-2 rounded">Upload File</Link>
        <Link to="/history" className="hover:bg-gray-700 p-2 rounded">Upload History</Link>
      </nav>
    </div>
  );
};

export default Sidebar;
