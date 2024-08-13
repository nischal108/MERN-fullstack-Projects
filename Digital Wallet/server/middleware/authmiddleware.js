const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization");

  const token = authHeader.replace("Bearer ", "").trim();

  if (!token) {
    return res.status(401).json({
      message: "No token provided, authorization denied",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({
        message: "Token is invalid or malformed",
      });
    }

    req.user = decoded.id;

    next();
  } catch (error) {
    console.error("Error verifying token:", error);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Token has expired",
      });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        message: "Token is invalid",
      });
    }

    res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = authMiddleware;
