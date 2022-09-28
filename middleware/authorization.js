const jwt = require("jsonwebtoken");
//authorization middleware that checks for token/token validity and attaches user id to request
const authorization = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    req.user_id = id;
    next();
  } catch (error) {
    res.status(401).json({ error: "Request is not authorized!" });
  }
};

module.exports = authorization;
