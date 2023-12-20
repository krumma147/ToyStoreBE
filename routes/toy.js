var express = require('express');
var router = express.Router();
var ToyModel = require('../models/toyModel');

/* GET cats listing. */
router.get('/', async (req, res) => {
  try {
    const toys = await ToyModel.find();
    res.json(toys);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create new toy API
router.post('/add', async (req, res) => {
    try {
      const toy = req.body;
  
      if (!toy.name) {
        return res.status(400).json({ error: 'Invalid request. Missing required fields.' });
      }
  
      // Check if the toy with the same name already exists
      const existingToy = await ToyModel.findOne({ name: toy.name });
  
      if (existingToy) {
        return res.status(409).json({ error: 'Toy with this name already exists.' });
      } else {
        // Create a new toy
        const newToy = new ToyModel(toy);
        await newToy.save();
        res.status(201).json(newToy);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

// Get toy details by ID API
router.get('/get/:id', async (req, res) => {
    const toyId = req.params.id;
  
    try {
      // Find the toy by ID
      const toy = await ToyModel.findById(toyId);
  
      if (!toy) {
        return res.status(404).json({ error: 'Toy not found.' });
      }
  
      res.status(200).json(toy);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

// Edit toy API
router.post('/edit/:id', async (req, res) => {
    const toyId = req.params.id;
  
    try {
      const updatedToy = req.body;
  
      if (!updatedToy.name) {
        return res.status(400).json({ error: 'Invalid request. Missing required fields.' });
      }
  
      // Find the existing toy by ID
      const existingToy = await ToyModel.findById(toyId);
  
      if (!existingToy) {
        return res.status(404).json({ error: 'Toy not found.' });
      }
  
      if (existingToy.name !== updatedToy.name) {
        const toyExists = await ToyModel.findOne({ name: updatedToy.name });
  
        if (toyExists) {
          return res.status(409).json({ error: 'Toy with this name already exists.' });
        }
      }
  
      // Update toy data and save
      existingToy.name = updatedToy.name;
      existingToy.price = updatedToy.price;
      existingToy.image = updatedToy.image;
      existingToy.branch = updatedToy.branch;
      existingToy.category = updatedToy.category;
      await existingToy.save();
  
      res.status(200).json(existingToy);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

// Delete toy API
router.delete('/delete/:id', async (req, res) => {
    const toyId = req.params.id;
  
    try {
      // Find the toy by ID and delete it
      const deletedToy = await ToyModel.findByIdAndDelete(toyId);
  
      if (!deletedToy) {
        return res.status(404).json({ error: 'Toy not found.' });
      }
  
      res.status(200).json({ message: 'Toy deleted successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

module.exports = router;
