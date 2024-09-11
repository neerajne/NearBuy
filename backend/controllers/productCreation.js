const async_handler = require("express-async-handler");
const Shop = require("../models/shopModel");
const ShopOwner = require("../models/ShopOwnerModel");
const Product = require("../models/productmodel");
const productCreation = async_handler(async (req, res) => {
  const {
    id,
    name,
    description,
    price,
    category,
    subcategory,
    stockQuantity,
    imageUrl,
    rating,
  } = req.body;

  const shopOwnerFound = await ShopOwner.findById({ _id : id }).populate({
    path: "shop",
    populate: {
      path: "products",
    },
  });

  const newProduct = await Product.create({
    name,
    description,
    price,
    category,
    subcategory,
    stockQuantity,
    imageUrl,
    rating,
  });
  res.status(200).json({
    message: "new product created is ",
    data: newProduct,
  });
  const { _id } = shopOwnerFound.shop[0];
  console.log(
    "Id found of that particular shop for whom we want to update the products",
    _id
  );
  const updatedShop = await Shop.findByIdAndUpdate(
    _id,
    { $push: { products: newProduct } },
    { new: true }
  );
  console.log("products added are ", updatedShop);
});
module.exports = productCreation;
