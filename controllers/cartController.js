const { getUserCart } = require("../model/cartModel");

const getCart = async (req, res) => {
  const { id } = req.params;

  try {
    const cart = await getUserCart(id);

    res.json(cart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getCart };
