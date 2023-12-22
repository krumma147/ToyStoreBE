const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization');
  
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  
    jwt.verify(token, "pomelo", (err, user) => {
      if (err) {
        return res.status(403).json({ error: 'Invalid token' });
      }
  
      req.user = user;
      next();
    });
  };
  

  const checkRole = (roles) => {
    return (req, res, next) => {
      const user = req.user;
  
      if (!user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      // Kiểm tra xem người dùng có trong danh sách roles được phép không
      if (roles.includes(user.role) || roles.includes('user')) {
        return next();
      }
      console.log('Permission denied for role:', user.role);
  
      return res.status(403).json({ error: 'Permission denied' });
    };
  };
  
  module.exports = { checkRole, authenticateJWT };