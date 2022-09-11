const pool = require("./database");

const queryAllProducts = async () => {
  const products = await pool.query("SELECT * FROM product");

  if (products.rows.length === 0) throw Error("No current products");

  return products.rows;
};

const querySingleProduct = async id => {
  const product = await pool.query("SELECT * FROM product WHERE id=$1", [id]);

  if (product.rows.length === 0) throw Error("No such product in the database");

  return product.rows[0];
};

module.exports = { queryAllProducts, querySingleProduct };
