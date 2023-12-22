var express = require('express');
var router = express.Router();
var orderModel = require('../models/orderModel');

// Create new cat API
router.get('/', async (req, res) => {
    try {
      const orders = await orderModel.find();
      res.status(200).json(orders);
    }catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

router.post('/add', async (req, res) => {
    try {
      const order = req.body;
  
      if (!order.user || !order.toy) {
        return res.status(400).json({ error: 'Invalid request. Missing required fields.' });
      }

    const newOrder = new orderModel(order);
    await newOrder.save();
    res.status(201).json(order);
    }catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

module.exports = router;