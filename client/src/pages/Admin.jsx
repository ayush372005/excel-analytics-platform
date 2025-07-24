import React, { useEffect, useState } from 'react';
import axios from '../api/axios'; // ✅ use custom axios instance

const Admin = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsersWithData = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/api/admin/users-with-data', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data);
      } catch (err) {
        console.error('Error fetching user data:', err);
      }
    };

    fetchUsersWithData();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">👑 Admin Panel – All Users</h2>
      {users.map((user) => (
        <div key={user.id} className="bg-white p-4 mb-4 rounded shadow">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <p><strong>Uploads:</strong> {user.uploadedDataCount}</p>
        </div>
      ))}
    </div>
  );
};

export default Admin;
