var express = require('express');
var router = express.Router();
var BranchModel = require('../models/branchModel');

/* GET users listing. */
router.get('/', async (req, res) => {
  try {
    const branchs = await BranchModel.find();
    res.json(branchs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create new branch API
router.post('/add', async (req, res) => {
  try {
    const branch = req.body;

    if (!branch.location || !branch.city) {
      return res.status(400).json({ error: 'Invalid request. Missing required fields.' });
    }

    // Check if the user with the same email already exists
    const existingBranch = await BranchModel.findOne({ location : branch.location });
    if (existingBranch) {
      return res.status(409).json({ error: 'Branch with this location already exists.' });
    }else{
      // Create a new branch
      const newBranch = new BranchModel(branch);
      await newBranch.save();
      res.status(201).json(newBranch);
    }

    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get user details by ID API
router.get('/get/:id', async (req, res) => {
const branchId = req.params.id;

try {
  // Find the user by ID
  const branch = await BranchModel.findById(branchId);

  if (!branch) {
    return res.status(404).json({ error: 'Branch not found.' });
  }

  res.status(200).json(branch);
} catch (error) {
  console.error(error);
  res.status(500).json({ error: 'Internal Server Error' });
}
});

// Edit branch API
router.post('/edit/:id', async (req, res) => {
  const branchId = req.params.id;
  try {
    const updatedBranch = req.body;

    if (!updatedBranch.location || !updatedBranch.city) {
      return res.status(400).json({ error: 'Invalid request. Missing required fields.' });
    }

    // Find the existing user by ID
    const existingBranch = await BranchModel.findById(branchId);

    if (!existingBranch) {
      return res.status(404).json({ error: 'Branch not found.' });
    }

    // Check if the location is being changed to an existing location
    if (existingBranch.location !== updatedBranch.location) {
      const locationExists = await BranchModel.findOne({ location: updatedBranch.location });
      if (locationExists) {
        return res.status(409).json({ error: 'User with this email already exists.' });
      }
    }

    // Update user data and save
    existingBranch.location = updatedBranch.location;
    existingBranch.city = updatedBranch.city;

    await existingBranch.save();

    res.status(200).json(existingBranch);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete user API
router.delete('/delete/:id', async (req, res) => {
const branchId = req.params.id;

try {
  // Find the user by ID and delete it
  const deletedBranch = await BranchModel.findByIdAndDelete(branchId);

  if (!deletedBranch) {
    return res.status(404).json({ error: 'User not found.' });
  }

  res.status(200).json({ message: 'User deleted successfully.' });
} catch (error) {
  console.error(error);
  res.status(500).json({ error: 'Internal Server Error' });
}
});

module.exports = router;
