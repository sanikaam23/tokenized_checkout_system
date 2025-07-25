// backend/models/user.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING },
  googleId: { type: DataTypes.STRING },

  // ✅ Added profile fields for consistency with ProfilePage.jsx
  firstname: { type: DataTypes.STRING },
  lastname: { type: DataTypes.STRING },
  username: { type: DataTypes.STRING },
  contact: { type: DataTypes.STRING },
});

module.exports = User;
