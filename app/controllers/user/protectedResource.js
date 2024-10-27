const protectedResourceController = async (req, res, next) => {
  try {
    res.status(200).json({ message: "This is the protected resource" });
  } catch (err) {
    next(err);
  }
};

module.exports = protectedResourceController;
