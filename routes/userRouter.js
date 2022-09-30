const router = require("express").Router();
const { getUser, updateUserInfo } = require("../controllers/userController");
const authorization = require("../middleware/authorization");

router.use(authorization);
router.get("/", getUser);
router.put("/", updateUserInfo);

module.exports = router;
