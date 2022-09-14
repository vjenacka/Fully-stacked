const { getAllOrders } = require("../model/orderModel");

const getOrders = async (req, res) => {
  try {
    const orders = await getAllOrders();

    res.json(orders);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getOrders };
