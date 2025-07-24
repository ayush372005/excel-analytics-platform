// src/pages/Profile.jsx
import React from 'react';
import { jwtDecode } from 'jwt-decode';

const Profile = () => {
  const token = localStorage.getItem('token');
  const decoded = token ? jwtDecode(token) : null;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">👤 My Profile</h2>
      {decoded ? (
        <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-4 rounded-lg shadow-md w-80">
          <div className="mb-2">
            <span className="font-semibold">Name:</span> {decoded.name || 'N/A'}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Email:</span> {decoded.email || 'N/A'}
          </div>
          <div>
            <span className="font-semibold">User ID:</span> {decoded.id}
          </div>
        </div>
      ) : (
        <p className="text-red-500">⚠️ User not logged in.</p>
      )}
    </div>
  );
};

export default Profile;
