const router = require("express").Router();
const { getUser, updateUser } = require("../controllers/userController");
const authorization = require("../middleware/authorization");

router.use(authorization);
router.get("/", getUser);
router.put("/", updateUser);

module.exports = router;
