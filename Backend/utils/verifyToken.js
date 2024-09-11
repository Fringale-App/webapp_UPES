import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  // Get the token from cookies or Authorization header
  const token = req.cookies.access_token || req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  // Verify the token
  // Verify the token
  jwt.verify(token, process.env.SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token." });
    }
    
    req.user = user;
    next();
  });
};
