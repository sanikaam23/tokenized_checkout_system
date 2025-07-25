// backend/models/index.js

const sequelize = require('../config/db');

// ✅ Import all models
const User = require('./user');
const Product = require('./product');
const Order = require('./order');
const Payment = require('./payment');

/**
 * ✅ Define model associations clearly
 */

// User ➔ Orders (1:M)
User.hasMany(Order, {
  foreignKey: 'userId',
  onDelete: 'CASCADE', // delete orders if user deleted
});
Order.belongsTo(User, { foreignKey: 'userId' });

// User ➔ Payments (1:M)
User.hasMany(Payment, {
  foreignKey: 'userId',
  onDelete: 'CASCADE', // delete payments if user deleted
});
Payment.belongsTo(User, { foreignKey: 'userId' });

// Payment ➔ Orders (1:M)
// Multiple orders under a single payment transaction
Payment.hasMany(Order, {
  foreignKey: 'paymentId',
  onDelete: 'SET NULL', // if payment deleted, keep orders but set paymentId null
});
Order.belongsTo(Payment, { foreignKey: 'paymentId' });

// Product ➔ Orders (1:M)
// Linking each order to its product
Product.hasMany(Order, {
  foreignKey: 'productId',
  onDelete: 'SET NULL', // if product deleted, keep orders but set productId null
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

module.exports = {
  sequelize,
  syncDB,
  User,
  Product,
  Order,
  Payment,
};
