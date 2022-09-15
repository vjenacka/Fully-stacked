const { getAllOrders, getOrderById } = require("../model/orderModel");

const getOrders = async (req, res) => {
  try {
    const orders = await getAllOrders();

    res.json(orders);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await getOrderById(id);

    res.json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getOrders, getOrder };
