const router = require("express").Router();
const loginController = require("../controllers/auth/login");
const refreshTokenController = require("../controllers/auth/refresh");
const signupController = require("../controllers/auth/signup");
const logoutController = require("../controllers/auth/logout");

router.post("/login", loginController);
router.get("/refresh", refreshTokenController);
router.post("/signup", signupController);
router.post("/logout", logoutController);

module.exports = router;
