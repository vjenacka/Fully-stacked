const { querySingleUser, queryUserInfo } = require("../model/userModel");

const getUser = async (req, res) => {
  const id = req.user_id;

  try {
    const user = await querySingleUser(id);

    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateUserInfo = async (req, res) => {
  const id = req.user_id;
  const { fullName, address, city, country } = req.body;

  try {
    const user = await queryUserInfo(id, fullName, address, city, country);

    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getUser, updateUserInfo };
