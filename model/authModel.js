const pool = require("./database");
const bcrypt = require("bcrypt");
const isValidUser = require("../utils/registerValidation");

const registerUser = async (username, email, password) => {
  //server side validation for username, email and password
  const { isError, errorMessage } = isValidUser(username, email, password);

  if (isError) throw Error(errorMessage);
  //check if username or email already exists in db
  const userExists = await pool.query(
    'SELECT * FROM "user" WHERE username=$1 OR email=$2',
    [username, email]
  );

  if (userExists.rows.length > 0) {
    throw Error("User already exists");
  }

  //encrypt password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await pool.query(
    'INSERT INTO "user"(username,email,password) VALUES ($1,$2,$3) RETURNING *',
    [username, email, hash]
  );

  return user.rows[0];
};

module.exports = { registerUser };
