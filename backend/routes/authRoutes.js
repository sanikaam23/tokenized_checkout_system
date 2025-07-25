const express = require('express');
const router = express.Router();
const {
  signup,
  login,
  googleLogin,
  getProfile,
  updateProfile,
} = require('../controllers/authController');

// 🔐 Auth routes
router.post('/signup', signup);
router.post('/login', login);
router.post('/google', googleLogin);

// 👤 Profile routes
router.get('/profile', getProfile);
router.put('/profile', updateProfile);

module.exports = router;
