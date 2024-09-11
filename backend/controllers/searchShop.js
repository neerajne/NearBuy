const async_Handler = require("express-async-handler");
const httpStatus = require("http-status");
const Shop = require("../models/shopModel");
const searchShop = async_Handler(async (req, res) => {
  const q = req.query.searchTerm || "";
  const result = await Shop.find({
    name: { $regex: new RegExp(`^${q}`, "im") },
  });
  if (result.length === 0) {
    return res.status(httpStatus.NOT_FOUND).json({
      message: "no shop found for this search",
    });
  }
  res.send(result);
});
module.exports = searchShop;
