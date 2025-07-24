const mongoose = require('mongoose');

const ExcelRecordSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  data: {
    type: Object,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('ExcelRecord', ExcelRecordSchema);
