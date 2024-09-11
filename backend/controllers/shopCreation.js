const async_handler = require("express-async-handler");
const Shop = require("../models/shopModel");
const ShopOwner = require("../models/ShopOwnerModel");
const httpStatus = require("http-status");
const shopCreation = async_handler(async (req, res) => {
  const { name, type, address, id } = req.body;
  if (!name || !type || !address || !id) {
    return res.status(httpStatus.BAD_REQUEST).json({
      msg: "plz provide all the fields ",
    });
  }
  console.log(name, type, address, id);
  const newShop = await Shop.create({ name, type, address });
  console.log("This is the new shop created", newShop);
  const updatedShopOwner = await ShopOwner.findByIdAndUpdate(
    id,
    { $push: { shop: newShop } },
    { new: true }
  );
  res.status(200).json({
    message: "This is the updated shop owner document",
    shop: updatedShopOwner,
  });
});

module.exports = shopCreation;
