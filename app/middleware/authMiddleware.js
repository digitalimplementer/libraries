const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  const token = req.header("Authorization").split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. Token not provided." });
  }

  try {
    const decoded = jwt.verify(token, "secret");

    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token." });
  }
};

const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.roleId === 1) {
    next();
  } else {
    res.status(403).json({ message: "Access denied. Admin role required." });
  }
};

module.exports = { authenticateUser, authorizeAdmin };
