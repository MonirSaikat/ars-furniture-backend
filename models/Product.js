const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  label: String,
  price: Number,
  details: String,
  rating: Number,
  imageUrl: String
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
