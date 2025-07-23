// backend/server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

// ✅ IMPORTANT: Middleware must be in this order
app.use(cors());
app.use(express.json()); // This MUST come before routes

// 🔍 Debug middleware to check if body is parsed
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  console.log('req.body:', req.body);
  console.log('Content-Type:', req.headers['content-type']);
  next();
});

// ✅ Import DB sync and models
const { syncDB } = require('./models');

// ✅ Import routes AFTER middleware setup
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const orderRoutes = require('./routes/orderRoutes');

// ✅ Use routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 5000;

// ✅ Start server
app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);
  await syncDB();
  console.log('🎉 Server is ready!');
});