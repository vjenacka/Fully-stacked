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

const createOrder = async (order, user_id) => {
  const newOrderID = await pool.query(
    'INSERT INTO "order"(user_id,status,date,total_cost) VALUES ($1,$2,$3,$4) RETURNING id',
    [user_id, "pending", order.date, order.total_cost]
  );
  //add all products to the order_item table
  const { id } = newOrderID.rows[0];
  const { products } = order;
  products.forEach(async product => {
    await pool.query(
      "INSERT INTO order_item(order_id,product_id,count) VALUES($1,$2,$3)",
      [id, product.product_id, product.count]
    );
  });
  return id;
};

module.exports = { getAllOrders, getOrderById, createOrder };
