// backend/models/index.js

const sequelize = require('../config/db');

// ✅ Import all models
const User = require('./user');
const Product = require('./product');
const Order = require('./order');
const Payment = require('./payment');

// ✅ Define model associations clearly

// User ➔ Orders (1:M)
User.hasMany(Order, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});
Order.belongsTo(User, { foreignKey: 'userId' });

// User ➔ Payments (1:M)
User.hasMany(Payment, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});
Payment.belongsTo(User, { foreignKey: 'userId' });

// Payment ➔ Orders (1:M)
// This assumes multiple orders can be under a single payment transaction (e.g. combined checkout)
Payment.hasMany(Order, {
  foreignKey: 'paymentId',
  onDelete: 'SET NULL',
});
Order.belongsTo(Payment, { foreignKey: 'paymentId' });

// Product ➔ Orders (1:M)
// Linking each order to the product if you later store products in DB
Product.hasMany(Order, {
  foreignKey: 'productId',
  onDelete: 'SET NULL',
});
Order.belongsTo(Product, { foreignKey: 'productId' });

/**
 * 🔹 Synchronize DB function
 * Ensures models sync with DB tables when called from server.js
 */
const syncDB = async () => {
  try {
    await sequelize.sync({ alter: true }); // alter:true updates schema safely in dev
    console.log('✅ All models were synchronized successfully.');
  } catch (error) {
    console.error('❌ Error synchronizing models:', error);
  }
};

module.exports = { sequelize, syncDB, User, Product, Order, Payment };
