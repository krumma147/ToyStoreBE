var express = require('express');
var router = express.Router();
var CategoryModel = require('../models/categoryModel');

/* GET cats listing. */
router.get('/', async (req, res) => {
  try {
    const cats = await CategoryModel.find();
    res.json(cats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create new cat API
router.post('/add', async (req, res) => {
  try {
    const cat = req.body;

    if (!cat.name) {
      return res.status(400).json({ error: 'Invalid request. Missing required fields.' });
    }

    // Check if the user with the same email already exists
    const existingCat = await CategoryModel.findOne({ name : cat.name });
    if (existingCat) {
      return res.status(409).json({ error: 'User with this email already exists.' });
    }else{
      // Create a cat user
      const newCat = new CategoryModel(cat);
      await newCat.save();
      res.status(201).json(newCat);
    }

    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get cat details by ID API
router.get('/get/:id', async (req, res) => {
  const catId = req.params.id;
  try {
    // Find the cat by ID
    const cat = await CategoryModel.findById(catId);

    if (!cat) {
      return res.status(404).json({ error: 'Category not found.' });
    }
    res.status(200).json(cat);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Edit user API
router.post('/edit/:id', async (req, res) => {
  const catId = req.params.id;
  try {
    const updatedCat = req.body;

    if (!updatedCat.name) {
      return res.status(400).json({ error: 'Invalid request. Missing required fields.' });
    }

    // Find the existing cat by ID
    const existingCat = await CategoryModel.findById(catId);

    if (!existingCat) {
      return res.status(404).json({ error: 'Category not found.' });
    }

    if (existingCat.name !== updatedCat.name) {
      const catExists = await CategoryModel.findOne({ name: updatedCat.name });
      if (catExists) {
        return res.status(409).json({ error: 'Category with this name already exists.' });
      }
    }

    // Update cat data and save
    existingCat.name = updatedCat.name;

    await existingCat.save();

    res.status(200).json(existingCat);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete user API
router.delete('/delete/:id', async (req, res) => {
const catId = req.params.id;

try {
  // Find the user by ID and delete it
  const deletedCat = await CategoryModel.findByIdAndDelete(catId);

  if (!deletedCat) {
    return res.status(404).json({ error: 'Category not found.' });
  }

  res.status(200).json({ message: 'Category deleted successfully.' });
} catch (error) {
  console.error(error);
  res.status(500).json({ error: 'Internal Server Error' });
}
});

module.exports = router;
