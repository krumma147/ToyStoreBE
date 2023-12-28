const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');
const {authenticateJWT, checkRole} = require('../middleware/auth');
// Login
router.post('/', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { _id: user._id, email: user.email, name: user.name, role: user.role },
      'pomelo',
      {
        expiresIn: '2h',
      }
    );

    res.json({ token, id: user._id, username: user.name, role:user.role });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/admin', authenticateJWT, checkRole(['admin']), async (req, res) => {
  const account = req.body;

  try {
    const user = await UserModel.findOne({ email: account.email });

    if (!user || !bcrypt.compareSync(account.password, user.password)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check if the user role is "admin"
    if (user.role !== 'admin') {
      return res.status(403).json({ error: 'Permission denied. Only admin can log in.' });
    }

    // JWT
    const token = jwt.sign(
      { sub: user._id, email: user.email, name: user.name, role: user.role },
      'pomelo',
      {
        expiresIn: '2h',
      }
    );

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
