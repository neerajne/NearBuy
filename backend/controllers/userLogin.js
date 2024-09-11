const httpStatus = require("http-status");
const User = require("../models/usermodel");
const bcrypt = require("bcrypt");
const async_handler = require("express-async-handler");
const login = async_handler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json(httpStatus.BAD_REQUEST).json({
      message: "Plz fill all the details !!",
    });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(httpStatus.NOT_FOUND).json({
      message: "user not found for this email",
    });
  }

  bcrypt.compare(password, user.password, function (err, result) {
    if (err) {
      return res.json(httpStatus.BAD_REQUEST).json({
        message: err,
      });
    }
    if (!result) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        msg: "wrong password",
      });
    }
    res.status(httpStatus.OK).json({
      result: result,
    });
  });
});
module.exports = login;
