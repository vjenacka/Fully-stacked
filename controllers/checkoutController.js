const { getUserCart } = require("../model/cartModel");
const { createOrder } = require("../model/orderModel");
const { querySingleUser } = require("../model/userModel");

const getUserDetails = async (req, res) => {
  const { user_id } = req;
  //check if there is a cart
  let cart = [];
  try {
    cart = await getUserCart(user_id);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }

  if (cart.length === 0)
    res.status(400).json({ error: "User cart empty, cannot place order" });
  //
  try {
    const user = await querySingleUser(user_id);

    res.json({
      user: {
        fullName: user.full_name,
        email: user.email,
        address: user.address,
        city: user.city,
        state: user.state,
        country: user.country,
      },
      cart,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const processOrder = async (req, res) => {
  const { user_id } = req;
  const { order } = req.body;

  try {
    const newOrder = await createOrder(order, user_id);

    res.json(newOrder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getUserDetails, processOrder };
