const express = require('express');
const router = express.Router();

// Middleware to check if the user is authenticated
const authenticateUser = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};
//Example
// router.get('/protected-route', authenticateUser, (req, res) => {
//   res.json({ message: 'This is a protected route' });
// });

export {authenticateUser};