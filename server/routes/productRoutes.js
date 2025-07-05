import express from 'express';
import Product from '../models/Product.js';
import asyncHandler from 'express-async-handler';

const router = express.Router();

// GET /api/products
router.get('/', asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
}));

// POST /api/products (admin)
router.post('/', asyncHandler(async (req, res) => {
  const product = new Product(req.body);
  const created = await product.save();
  res.status(201).json(created);
}));

export default router;
