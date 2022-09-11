const pool = require("./database");

const checkUser = async (username, email, password) => {
  const user = await pool.query("SELECT * FROM users WHERE username=$1", [
    username,
  ]);
  if (user) throw Error("User already exists");
};
