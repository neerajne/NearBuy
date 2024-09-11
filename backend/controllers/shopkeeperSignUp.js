const asyncHandler = require("express-async-handler");
const shopOwner = require("../models/ShopOwnerModel");
const generateToken = require("../utils/generateToken");
const httpStatus = require("http-status");
const signUpShopkeeper = asyncHandler(async (req, res) => {
  const { name, email, password, phone } = req.body;
  if (!name || !email || !password || !phone) {
    return res.send("Fill all the fields");
  }
  const newShopOwner = await shopOwner.create({
    name,
    email,
    password,
    phone,
  });
  res.status(httpStatus.CREATED).json({
    name,
    email,
    phone,
    _id: newShopOwner._id,
    token: generateToken(newShopOwner._id),
  });
});
module.exports = signUpShopkeeper;
