import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  // Get token from header, e.g., "Bearer YOUR_TOKEN"
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.split(' ')[1];

  // 1. Check if no token
  if (!token) {
    return res.status(401).json({ msg: 'Need of the access token' });
  }

  // 2. Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
  
    req.users = {id : decoded.id} ; 
    

  
    return next(); // This is line 24 from your log

  } catch (err) {
    // If token is invalid
    return res.status(401).json({ msg: 'Token is not valid' });
  }
};

export default authMiddleware;