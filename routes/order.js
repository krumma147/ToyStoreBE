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

  // Get order details by ID API
router.get('/get/:id', async (req, res) => {
  const orderID = req.params.id;

  try {
    // Find the toy by ID
    const order = await orderModel.findById(orderID);

    if (!order) {
      return res.status(404).json({ error: 'Order not found.' });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.post('/add', async (req, res) => {
    try {
      const order = req.body;
  
      if (!order.user || !order.toys) {
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

  router.delete('/delete/:id', async (req, res) => {
    const orderID = req.params.id;
    try {
      const deletedOrder = await orderModel.findByIdAndDelete(orderID);
  
      if (!deletedOrder) {
        return res.status(404).json({ error: 'Order not found.' });
      }
  
      res.status(200).json({ message: 'Order deleted successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

module.exports = router;