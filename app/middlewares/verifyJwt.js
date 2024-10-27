const jwt = require("jsonwebtoken");

const verifyJwt = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader && !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const accessToken = authHeader.split(" ")[1];
    jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET,
      async (err, decoded) => {
        try {
          if (err) return res.status(403).json({ message: "Forbidden" });
          req.user = decoded.UserInfo.name;
          next();
        } catch (error) {
          throw error;
        }
      }
    );
  } catch (error) {
    next(error);
  }
};

module.exports = verifyJwt;
