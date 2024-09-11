const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  }, // Example: "Fiction", "Bread", "Fruits", etc.
  subcategory: {
    type: String,
    // required: true,
  }, // Example: "Fiction", "Shoes", etc.
  stockQuantity: {
    type: Number,
    default: 1,
  },
  imageUrl: String,
  rating: {
    type: Number,
    default: null,
  },
  shop: {
    type: Schema.Types.ObjectId,
    ref: "Shop"
  }
});
const Product = new model("Product", productSchema);
module.exports = Product;
