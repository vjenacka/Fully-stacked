const { registerUser, loginUser } = require("../model/authModel");

//log in a user
const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await loginUser(username, password);

    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
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
