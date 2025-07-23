// backend/routes/productRoutes.js

const express = require('express');
const router = express.Router();
const { getProducts } = require('../controllers/productController');

// ⚠️ Removed createProduct and authMiddleware for now
// because your current integration only fetches products from DummyJSON

// GET /api/products - Fetch products from DummyJSON via backend
router.get('/', getProducts);

module.exports = router;
