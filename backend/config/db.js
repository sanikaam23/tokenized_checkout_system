// backend/config/db.js

const { Sequelize } = require('sequelize');
require('dotenv').config();

// ✅ Initialize Sequelize with DATABASE_URL from .env
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',  // Specifies PostgreSQL as DB dialect
  logging: false,       // Disable SQL query logging in console
});

// ✅ Test the database connection immediately when this file is imported
(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ PostgreSQL connection established successfully.');
  } catch (error) {
    console.error('❌ Unable to connect to the PostgreSQL database:', error);
  }
})();

module.exports = sequelize;
