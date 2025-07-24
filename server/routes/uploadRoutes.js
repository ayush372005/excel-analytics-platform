const express = require('express');
const multer = require('multer');
const xlsx = require('xlsx');
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/', upload.single('file'), (req, res) => {
  console.log('📥 Upload route hit'); // ✅ ADD THIS LINE
  console.log('Received file:', req.file?.originalname); // ✅ AND THIS ONE

  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const jsonData = xlsx.utils.sheet_to_json(sheet);
    res.json({ data: jsonData });
  } catch (error) {
    console.error('❌ Error parsing file:', error.message);
    res.status(500).json({ error: 'Failed to process Excel file' });
  }
});

module.exports = router;
