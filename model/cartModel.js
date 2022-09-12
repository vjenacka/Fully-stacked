const pool = require("./database");

const getUserCart = async id => {
  const cartItems = await pool.query("SELECT * FROM cart WHERE user_id=$1", [
    id,
  ]);

  if (cartItems.rows.length === 0) throw Error("User cart is empty");

  return cartItems.rows;
};

module.exports = { getUserCart };
