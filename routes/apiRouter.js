const router = require("express").Router();
const productRouter = require("./productRouter");
const userRouter = require("./userRouter");

router.use("/product", productRouter);
router.use("/user", userRouter);

module.exports = router;
