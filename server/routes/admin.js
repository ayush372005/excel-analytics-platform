const express = require('express');
const router = express.Router();
const User = require('../models/User');
const ExcelRecord = require('../models/ExcelRecord');
const adminMiddleware = require('../middleware/adminMiddleware');

// GET /api/admin/users-with-data
router.get('/users-with-data', adminMiddleware, async (req, res) => {
  try {
    const users = await User.find({});
    const allData = await ExcelRecord.find({});

    const userDataMap = users.map(user => {
      const userRecords = allData.filter(record => record.userId?.toString() === user._id.toString());
      return {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        uploadedDataCount: userRecords.length,
        uploadedData: userRecords,
      };
    });

    res.json(userDataMap);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user data', error: err.message });
  }
});

module.exports = router;
