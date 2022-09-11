require("dotenv").config();
//express setup
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const port = process.env.PORT || 8000;

//routers
const authRouter = require("./routes/authRouter");

//middleware
app.use(cors());
app.use(morgan("tiny"));

//routes
app.get("/", (req, res) => {
  res.json({ msg: "home path response" });
});
app.use("/auth", authRouter);

app.listen(port, () => {
  console.log("listening on " + port);
});
