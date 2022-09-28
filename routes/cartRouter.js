const router = require("express").Router();
const {
  getCart,
  addProduct,
  removeProduct,
  removeOne,
  addOne,
} = require("../controllers/cartController");
const authorization = require("../middleware/authorization");

router.use(authorization);

router.get("/", getCart);
router.post("/", addProduct);
router.put("/add", addOne);
router.put("/remove", removeOne);
router.delete("/", removeProduct);

module.exports = router;
