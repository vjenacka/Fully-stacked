const router = require("express").Router();
const {
  getUserDetails,
  processOrder,
} = require("../controllers/checkoutController");

router.get("/", getUserDetails);
router.post("/", processOrder);

module.exports = router;
