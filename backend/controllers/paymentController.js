// controllers/paymentController.js
const { Payment } = require('../models');

exports.processPayment = async (req, res) => {
  try {
    console.log('🔍 Payment controller called');
    console.log('req.body:', req.body);
    
    // Check if req.body exists
    if (!req.body) {
      return res.status(400).json({
        success: false,
        error: 'Request body is missing'
      });
    }

    const { userId, method, cardNumber, upiId, amount } = req.body;

    // Validate required fields
    if (!userId || !method || !amount) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: userId, method, amount'
      });
    }

    // ✅ Generate a mock token
    const token = 'tok_mock_' + Math.random().toString(36).substr(2, 10);

    // ✅ Save in Payments table
    const payment = await Payment.create({
      userId,
      method,
      cardNumber: method === 'card' ? token : null,
      upiId: method === 'upi' ? upiId : null,
      token,
      amount
    });

    res.status(201).json({
      success: true,
      message: 'Payment processed successfully (mock).',
      payment
    });
  } catch (error) {
    console.error('❌ Error processing payment:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Internal server error',
      details: error.message 
    });
  }
};