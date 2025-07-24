const XLSX = require("xlsx");
const ExcelData = require("../models/ExcelData");

const uploadExcel = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const workbook = XLSX.read(file.buffer, { type: "buffer" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(sheet);

    // Save to MongoDB
    const saved = await ExcelData.create({
      filename: file.originalname,
      data: jsonData,
    });

    res.json(saved.data);
  } catch (err) {
    console.error("❌ Upload error:", err);
    res.status(500).json({ message: "Failed to parse Excel file" });
  }
};

module.exports = { uploadExcel };
