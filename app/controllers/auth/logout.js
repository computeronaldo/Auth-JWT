const logoutController = (req, res, next) => {
  try {
    const cookies = req.cookies;
    if (!cookies.jwt) return res.status(204).json({ message: "No content" });
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    });
    res.status(200).json({ message: "Logged out" });
  } catch (err) {
    next(err);
  }
};

module.exports = logoutController;
