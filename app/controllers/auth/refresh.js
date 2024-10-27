const jwt = require("jsonwebtoken");
const { fetchUserByUsername } = require("../../services");

const refreshTokenController = async (req, res, next) => {
  try {
    const cookies = req.cookies;

    if (!cookies.jwt) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const refreshToken = req.cookies.jwt;
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async function (err, decoded) {
        try {
          if (err) return res.status(403).json({ message: "Forbidden" });

          const username = decoded.UserInfo.name;
          const foundUser = await fetchUserByUsername(username);

          if (!foundUser) {
            return res.status(404).json({ message: "User not found" });
          }

          const accessToken = jwt.sign(
            {
              UserInfo: {
                name: username,
              },
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "20s" }
          );
          res.status(200).json({ accessToken });
        } catch (error) {
          next(error);
        }
      }
    );
  } catch (err) {
    next(err);
  }
};

module.exports = refreshTokenController;
