const pool = require("./database");

const getAllOrders = async () => {
  const orders = await pool.query('SELECT * FROM "order"');

  return orders.rows;
};

module.exports = { getAllOrders };
