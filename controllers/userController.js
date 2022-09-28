const { querySingleUser, queryUserUpdate } = require("../model/userModel");

const getUser = async (req, res) => {
  const id = req.user_id;

  try {
    const user = await querySingleUser(id);

    res.json({
      email: user.email,
      username: user.username,
      address: user.address,
      city: user.city,
      country: user.country,
      fullName: user.full_name,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  const id = req.user_id;
  const { fullName, username, email, password, address, city, country } =
    req.body;

  try {
    const user = await queryUserUpdate(
      id,
      fullName,
      username,
      email,
      password,
      address,
      city,
      country
    );

    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getUser, updateUser };
