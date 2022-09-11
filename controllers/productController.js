const {
  queryAllProducts,
  querySingleProduct,
} = require("../model/productModel");

const getProducts = async (req, res) => {
  try {
    const products = await queryAllProducts();

    res.json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await querySingleProduct(id);

    res.json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getProducts, getProduct };
