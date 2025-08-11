const jwt = require('jsonwebtoken');
const JWT_SECRET = "sheraz@ahmed"; // or from .env

const fetchuser = (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) {
    return res.status(401).send({ error: "Access Denied: No token provided" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Invalid token" });
  }
};

module.exports = fetchuser; // ✅ Make sure you export a function
