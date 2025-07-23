// routes/paymentRoutes.js

const express = require('express');
const router = express.Router();
const { processPayment } = require('../controllers/paymentController');

// POST /api/payments/process
router.post('/process', processPayment);


module.exports = router;



