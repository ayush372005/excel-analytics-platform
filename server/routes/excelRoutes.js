const express = require('express');
const router = express.Router();
const multer = require('multer');
const xlsx = require('xlsx');
const ExcelRecord = require('../models/ExcelRecord');
const authMiddleware = require('../middleware/authMiddleware');

const storage = multer.memoryStorage();
const upload = multer({ storage });

// ✅ Upload Excel file (per user)
router.post('/upload', authMiddleware, upload.single('file'), async (req, res) => {
  try {
    console.log('✅ /upload route hit');

    const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    if (!sheetData.length) {
      console.log('⚠️ No data found in Excel file');
      return res.status(400).json({ msg: 'No data found' });
    }

    // Remove old records from this user
    await ExcelRecord.deleteMany({ user: req.user.id });

    // Wrap each row inside a `data` object with user id
    const recordsWithUser = sheetData.map((row) => ({
      user: req.user.id,
      data: row,
    }));

    const inserted = await ExcelRecord.insertMany(recordsWithUser);
    console.log(`✅ Inserted ${inserted.length} records for user ${req.user.id}`);
    res.json({ msg: 'Upload successful', records: inserted.length });
  } catch (err) {
    console.error('❌ Upload error:', err);
    res.status(500).json({ msg: 'Upload error', error: err.message });
  }
});

// ✅ Fetch data for logged-in user
router.get('/data', authMiddleware, async (req, res) => {
  try {
    const data = await ExcelRecord.find({ user: req.user.id });
    res.json(data);
  } catch (err) {
    res.status(500).json({ msg: 'Fetch error', error: err.message });
  }
});

// ✅ Delete data for logged-in user
router.delete('/delete', authMiddleware, async (req, res) => {
  try {
    await ExcelRecord.deleteMany({ user: req.user.id });
    res.json({ msg: 'Records deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Delete error', error: err.message });
  }
});

// ✅ Admin-only: Get all uploads from all users
router.get('/all', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Access denied: Admins only' });
    }

    const allData = await ExcelRecord.find({}).populate('user', 'name email');
    res.json(allData);
  } catch (err) {
    res.status(500).json({ msg: 'Admin fetch error', error: err.message });
  }
});

module.exports = router;
