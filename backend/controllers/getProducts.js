const async_handler = require("express-async-handler");
const Shop = require("../models/shopModel"); 
const getProducts = async_handler(async (req, res) => {
  const { id } = req.params;
  const shop = await Shop.findById({ _id: id }).populate("products");
  res.send(shop.products);
});
module.exports = getProducts;
