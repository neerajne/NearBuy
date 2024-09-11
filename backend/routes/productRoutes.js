const express = require("express");
const productCreation = require("../controllers/productCreation");
const getProducts = require("../controllers/getProducts");
const shopAuth = require("../middlewares/shopAuth");
const router = express.Router();

router.route("/create").post(shopAuth, productCreation);
router.route("/getProducts/:id").get(getProducts);
module.exports = router;
