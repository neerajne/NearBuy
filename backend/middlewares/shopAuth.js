const async_handler = require("express-async-handler");
const jwt = require("jsonwebtoken"); // Add this line to import jwt
const ShopOwner = require("../models/ShopOwnerModel");
const httpStatus = require("http-status");

const shopAuth = async_handler(async (req, res, next) => {
  let token;
  console.log(req.headers);
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      console.log("Token:", token);

      const decoded = jwt.verify(token, process.env.SECRET);
      // console.log("DecodedId:", decoded.iD);
      const user = await ShopOwner.findOne({ _id: decoded.iD });
      // console.log(user);
      if (!user) {
        return res.status(httpStatus.NOT_FOUND).json({
          msg: `shopowner not found for this id ${decoded.iD}`,
        });
      }

      next();
    } catch (error) {
      console.error("Error during token verification or user lookup:", error); // Log the error
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    console.log("No authorization header or Bearer token missing");
    res.status(401).json({ message: "Not authorized, no token found" });
  }

});

module.exports = shopAuth;
