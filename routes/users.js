  var express = require('express');
  var router = express.Router();
  var UserModel = require('../models/userModel');

  /* GET users listing. */
  router.get('/', async (req, res) => {
    try {
      const users = await UserModel.find();
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // Create new user API
  router.post('/add', async (req, res) => {
    try {
      const user = req.body;
  
      if (!user.name || !user.email) {
        return res.status(400).json({ error: 'Invalid request. Missing required fields.' });
      }
  
      // Check if the user with the same email already exists
      const existingUser = await UserModel.findOne({ email : user.email });
      if (existingUser) {
        return res.status(409).json({ error: 'User with this email already exists.' });
      }else{
        // Create a new user
        const newUser = new UserModel(user);
        await newUser.save();
        res.status(201).json(newUser);
      }
  
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // Get user details by ID API
router.get('/get/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    // Find the user by ID
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

  // Edit user API
  router.post('/edit/:id', async (req, res) => {
    const userId = req.params.id;
    try {
      const updatedUserData = req.body;
  
      if (!updatedUserData.name || !updatedUserData.email) {
        return res.status(400).json({ error: 'Invalid request. Missing required fields.' });
      }
  
      // Find the existing user by ID
      const existingUser = await UserModel.findById(userId);
  
      if (!existingUser) {
        return res.status(404).json({ error: 'User not found.' });
      }
  
      // Check if the email is being changed to an existing email
      if (existingUser.email !== updatedUserData.email) {
        const emailExists = await UserModel.findOne({ email: updatedUserData.email });
        if (emailExists) {
          return res.status(409).json({ error: 'User with this email already exists.' });
        }
      }
  
      // Update user data and save
      existingUser.name = updatedUserData.name;
      existingUser.email = updatedUserData.email;
      existingUser.password = updatedUserData.password; 
  
      await existingUser.save();
  
      res.status(200).json(existingUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // Delete user API
router.delete('/delete/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    // Find the user by ID and delete it
    const deletedUser = await UserModel.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found.' });
    }

    res.status(200).json({ message: 'User deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

  module.exports = router;
