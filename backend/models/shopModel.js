const { Schema, model } = require("mongoose");
const shopSchema = new Schema({
  name: String,
  type: String, // Example: "Bookstore", "Bakery", etc.
  address: {
    street: String,
    city: String,
    zipcode: String,
    state: String,
    country: String,
  },
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }], // References to Products collection
  rating: {
    type: Number,
    default: null,
  },

  // owner: {
  //   type: Schema.Types.ObjectId,
  //   ref: "ShopOwner",
  // }, // Reference to the user who owns the shop
});

shopSchema
const Shop = new model("Shop", shopSchema);
module.exports = Shop;

//reviews: [ObjectId], // References to Reviews collection
