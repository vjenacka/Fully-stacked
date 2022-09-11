const { registerUser } = require("../model/authModel");

//log in a user
const login = async (req, res) => {
  res.send("logged in");
};

const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await registerUser(username, email, password);

    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { login, register };
