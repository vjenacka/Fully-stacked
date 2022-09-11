const router = require("express").Router();
const { login, register } = require("../controllers/authController");

router.post("/login", login);

router.post("/register", register);

router.post("/logout", (req, res) => {
  res.send("logged out");
});

module.exports = router;
