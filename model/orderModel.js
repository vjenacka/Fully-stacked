const pool = require("./database");

const getAllOrders = async () => {
  const orders = await pool.query('SELECT * FROM "order"');

  return orders.rows;
};

const getOrderById = async id => {
  const order = await pool.query('SELECT * FROM "order" WHERE id=$1', [id]);

  if (order.rows.length === 0) throw Error("No such order");

  //get all the ordered products
  const products = await pool.query(
    "SELECT product_id, count, name, price FROM order_item INNER JOIN product ON order_item.product_id = product.id WHERE order_id=$1",
    [id]
  );

  return { ...order.rows[0], products: products.rows };
};

module.exports = { getAllOrders, getOrderById };
