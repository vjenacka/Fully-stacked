const pool = require("./database");
const bcrypt = require("bcrypt");
const isValidUser = require("../utils/registerValidation");

const querySingleUser = async id => {
  const user = await pool.query('SELECT * FROM "user" WHERE id=$1', [id]);

  if (user.rows.length === 0) throw Error("No user found");

  return user.rows[0];
};

const queryUserUpdate = async (
  id,
  fullName,
  username,
  email,
  password,
  address,
  city,
  state,
  country
) => {
  //validate user credentials
  const { isError, errorMessage } = isValidUser(username, email, password);
  if (isError) throw Error(errorMessage);

  //check if username and email are taken
  const userExists = await pool.query(
    'SELECT * FROM "user" WHERE username=$1 OR email=$2',
    [username, email]
  );
  if (userExists.rows.length > 0) throw Error("Username or email taken");

  //check if user is in db
  const user = await pool.query('SELECT * FROM "user" WHERE id=$1', [id]);
  if (user.rows.length === 0) throw Error("User does not exist");

  //encrypt the new password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const updatedUser = await pool.query(
    'UPDATE "user" SET full_name=$1, username=$2, email=$3, password=$4, address=$5, city=$6, state=$7, country=$8 WHERE id=$9 RETURNING *',
    [fullName, username, email, hash, address, city, state, country, id]
  );

  return updatedUser.rows[0];
};

module.exports = { querySingleUser, queryUserUpdate };
