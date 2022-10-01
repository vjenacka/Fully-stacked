const pool = require("./database");

const getUserCart = async user_id => {
  //joins the cart and product table and returns info about cart items
  const cartItems = await pool.query(
    "SELECT product_id, count, name, price, img_url FROM cart INNER JOIN product ON cart.product_id = product.id WHERE user_id=$1",
    [user_id]
  );

  return cartItems.rows;
};
//adds a product if not in cart or increase quantity
const addProductToCart = async (user_id, product_id) => {
  if (!user_id || !product_id) throw Error("User id or product id missing");
  //check if cart item in db
  const cartItem = await pool.query(
    "SELECT * FROM cart WHERE user_id=$1 AND product_id=$2",
    [user_id, product_id]
  );

  //if in db add to quantity of product
  if (cartItem.rows[0]) {
    const updateItem = await pool.query(
      "UPDATE cart SET count=count+1 WHERE user_id=$1 AND product_id=$2 RETURNING *",
      [user_id, product_id]
    );
    return updateItem.rows[0];
  }
  //if not in db insert new cart item
  const newItem = await pool.query(
    "INSERT INTO cart(user_id,product_id,count) VALUES ($1,$2,1) RETURNING *",
    [user_id, product_id]
  );

  return newItem.rows[0];
};

const removeProductFromCart = async (user_id, product_id) => {
  if (!user_id || !product_id) throw Error("User id or product id missing");
  //check if cart item in db
  const cartItem = await pool.query(
    "SELECT * FROM cart WHERE user_id=$1 AND product_id=$2",
    [user_id, product_id]
  );

  if (!cartItem.rows[0]) throw Error("No cart item");

  await pool.query("DELETE FROM cart WHERE user_id=$1 AND product_id=$2", [
    user_id,
    product_id,
  ]);
};

const addOneProduct = async (user_id, product_id) => {
  if (!user_id || !product_id) throw Error("User id or product id missing");

  const updateItem = await pool.query(
    "UPDATE cart SET count=count+1 WHERE user_id=$1 AND product_id=$2 RETURNING *",
    [user_id, product_id]
  );
  return updateItem.rows[0];
};

const removeOneProduct = async (user_id, product_id) => {
  if (!user_id || !product_id) throw Error("User id or product id missing");

  const updateItem = await pool.query(
    "UPDATE cart SET count=count-1 WHERE user_id=$1 AND product_id=$2 RETURNING *",
    [user_id, product_id]
  );
  return updateItem.rows[0];
};

module.exports = {
  getUserCart,
  addProductToCart,
  removeProductFromCart,
  removeOneProduct,
  addOneProduct,
};
