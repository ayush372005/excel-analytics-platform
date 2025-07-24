const mongoose = require("mongoose");

const ExcelDataSchema = new mongoose.Schema({
  filename: String,
  data: [mongoose.Schema.Types.Mixed], // Excel rows
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("ExcelData", ExcelDataSchema);
