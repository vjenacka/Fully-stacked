const {
  getUserCart,
  addProductToCart,
  removeProductFromCart,
  removeOneProduct,
  addOneProduct,
} = require("../model/cartModel");

const getCart = async (req, res) => {
  const { user_id } = req;

  try {
    const cart = await getUserCart(user_id);

    res.json(cart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const addProduct = async (req, res) => {
  const { user_id } = req;
  const { product_id } = req.body;

  try {
    const cart = await addProductToCart(user_id, product_id);

    res.json(cart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const removeProduct = async (req, res) => {
  const { user_id } = req;
  const { product_id } = req.body;
  try {
    await removeProductFromCart(user_id, product_id);
    res.json("Item removed");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const removeOne = async (req, res) => {
  const { user_id } = req;
  const { product_id } = req.body;

  try {
    const item = await removeOneProduct(user_id, product_id);
    res.json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const addOne = async (req, res) => {
  const { user_id } = req;
  const { product_id } = req.body;

  try {
    const item = await addOneProduct(user_id, product_id);
    res.json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getCart, addProduct, removeProduct, removeOne, addOne };
