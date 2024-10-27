const jwt = require("jsonwebtoken");
const { fetchUserByUsername } = require("../../services");

const loginController = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: "Bad request, both username and password are required",
      });
    }

    const user = await fetchUserByUsername(username);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const checkPassword = await user.comparePassword(password);
    if (!checkPassword) {
      return res.status(401).json({ message: "Incorrect password" });
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

    const refreshToken = jwt.sign(
      {
        UserInfo: {
          name: username,
        },
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1m" }
    );

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    });
    res
      .status(200)
      .json({ message: "Logged in successfully", accessToken: accessToken });
  } catch (err) {
    next(err);
  }
};

module.exports = loginController;
