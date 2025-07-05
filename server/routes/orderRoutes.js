import express from 'express';
import Order from '../models/Order.js';
import asyncHandler from 'express-async-handler';

const router = express.Router();

// POST /api/orders
router.post('/', asyncHandler(async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;

  if(orderItems && orderItems.length === 0){
    res.status(400);
    throw new Error('No order items');
  }

  // Business rule: Only allow Razorpay for Jodhpur addresses
  let finalPaymentMethod = paymentMethod;
  if(shippingAddress.city.trim().toLowerCase() === 'jodhpur') {
    finalPaymentMethod = 'RAZORPAY';
  }

  const order = new Order({
    user: req.user ? req.user._id : null,
    orderItems,
    shippingAddress,
    paymentMethod: finalPaymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice
  });

  const createdOrder = await order.save();
  res.status(201).json(createdOrder);
}));

export default router;
