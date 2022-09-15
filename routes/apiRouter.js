const router = require("express").Router();
const productRouter = require("./productRouter");
const userRouter = require("./userRouter");
const cartRouter = require("./cartRouter");
const orderRouter = require("./orderRouter");
const checkoutRouter = require("./checkoutRouter");

router.use("/product", productRouter);
router.use("/user", userRouter);
router.use("/cart", cartRouter);
router.use("/order", orderRouter);
router.use("/checkout", checkoutRouter);

module.exports = router;
