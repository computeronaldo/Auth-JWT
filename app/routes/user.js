const router = require("express").Router();
const protectedResourceController = require("../controllers/user/protectedResource");
const verifyJwt = require("../middlewares/verifyJwt");

router.use(verifyJwt);
router.get("/protected-resource", protectedResourceController);

module.exports = router;
