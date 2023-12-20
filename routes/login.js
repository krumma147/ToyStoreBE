var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
var UserModel = require('../models/userModel');

router.post('/', async (req, res) => {
    const account = req.body;
  
    try {
      const user = await UserModel.findOne({ email : account.email });
    //   if (!user || !bcrypt.compareSync(password, user.password)) {
    //     return res.status(401).json({ error: 'Invalid credentials' });
    //   }
    if (!user || (!user.password === account.password)) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    req.session.user = {
            id: user._id,
            name: user.name,
            role: user.role,
    };
  
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

router.post('/admin', async (req, res) => {
  const account = req.body;

  try {
    const user = await UserModel.findOne({ email: account.email });

    if (!user || (!user.password === account.password)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check if the user role is "admin"
    if (user.role !== 'admin') {
      return res.status(403).json({ error: 'Permission denied. Only admin can log in.' });
    }

    // Set user data in the session
    req.session.user = {
      id: user._id,
      name: user.name,
      role: user.role,
    };

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;