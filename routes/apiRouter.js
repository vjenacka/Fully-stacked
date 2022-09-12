const router = require("express").Router();
const productRouter = require("./productRouter");
const userRouter = require("./userRouter");
const cartRouter = require("./cartRouter");

router.use("/product", productRouter);
router.use("/user", userRouter);
router.use("/cart", cartRouter);

module.exports = router;
