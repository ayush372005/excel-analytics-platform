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
        <div className="bg-white p-4 rounded shadow w-64">
          <p><strong>Name:</strong> {decoded.name || 'N/A'}</p>
          <p><strong>Email:</strong> {decoded.email || 'N/A'}</p>
          <p><strong>User ID:</strong> {decoded.id}</p>
        </div>
      ) : (
        <p>User not logged in.</p>
      )}
    </div>
  );
};

export default Profile;
