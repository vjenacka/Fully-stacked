const router = require("express").Router();
const {
  getUserDetails,
  processOrder,
} = require("../controllers/checkoutController");
const authorization = require("../middleware/authorization");

router.use(authorization);
router.get("/", getUserDetails);
router.post("/", processOrder);

module.exports = router;
