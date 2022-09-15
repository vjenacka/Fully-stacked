const router = require("express").Router();
const { getOrders, getOrder } = require("../controllers/orderController");

router.get("/", getOrders);
router.get("/:id", getOrder);

module.exports = router;
