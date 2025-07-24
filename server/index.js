const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');
const excelRoutes = require('./routes/excelRoutes');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Allow both local and Netlify frontend origins
app.use(cors({
  origin: [
    'http://localhost:3000', ],
  credentials: true
}));

// ✅ Parse incoming JSON
app.use(express.json());

// ✅ Mount routes
app.use('/api/auth', authRoutes);       // /api/auth/login, /api/auth/register
app.use('/api/excel', excelRoutes);     // /api/excel/upload, /api/excel/history, etc.
app.use('/api/admin', adminRoutes);     // /api/admin/users

// ✅ Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB connected');
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT} or Render`);
  });
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err.message);
});
