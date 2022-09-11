const jwt = require("jsonwebtoken");

const jwtGenerator = id =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });

module.exports = jwtGenerator;
