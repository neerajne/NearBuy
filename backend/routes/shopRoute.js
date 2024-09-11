const express = require("express");
const shopCreation = require("../controllers/shopCreation");
const getAllShops = require("../controllers/allShops");
const getShop = require("../controllers/getShop");
const searchShop = require("../controllers/searchShop");
const shopAuth = require("../middlewares/shopAuth");
const router = express.Router();
router.route("/search").get(shopAuth, searchShop);
router.route("/create").post(shopAuth, shopCreation);
router.route("/all").get(getAllShops);
router.route("/:id").get(shopAuth, getShop);

module.exports = router;
