const router = require("express").Router();
const { getCart } = require("../controllers/cartController");

router.get("/:id", getCart);

module.exports = router;
