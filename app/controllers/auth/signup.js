const { createUser } = require("../../services");

const signupController = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: "Bad request, both username and password are required.",
      });
    }

    const newUser = await createUser({ username, password });
    if (!newUser) {
      return res
        .status(500)
        .json({ message: "Something went wrong. Try again later." });
    }

    res.status(200).json({ message: "User created successfully." });
  } catch (err) {
    next(err);
  }
};

module.exports = signupController;
