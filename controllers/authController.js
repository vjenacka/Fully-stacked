//log in a user
const login = async (req, res) => {
  res.send("logged in");
};

const register = async (req, res) => {
  const { username, email, password } = req.body;
};

module.exports = { login, register };
