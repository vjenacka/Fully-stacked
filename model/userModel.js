const pool = require("./database");

const querySingleUser = async id => {
  const user = await pool.query('SELECT * FROM "user" WHERE id=$1', [id]);

  if (user.rows.length === 0) throw Error("No user found");

  const {
    email,
    username,
    address,
    city,
    country,
    full_name: fullName,
  } = user.rows[0];

  return { email, username, address, city, country, fullName };
};

const queryUserInfo = async (id, fullName, address, city, country) => {
  //check if user is in db
  const user = await pool.query('SELECT * FROM "user" WHERE id=$1', [id]);
  if (user.rows.length === 0) throw Error("User does not exist");

  const updatedUser = await pool.query(
    'UPDATE "user" SET full_name=$1, address=$2, city=$3, country=$4 WHERE id=$5 RETURNING *',
    [fullName, address, city, country, id]
  );
  const { username } = updatedUser.rows[0];
  return { username, fullName, address, city, country };
};

module.exports = { querySingleUser, queryUserInfo };
