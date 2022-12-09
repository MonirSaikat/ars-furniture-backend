const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
  products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  discount: { type: Number, default: 0 },
  total: { type: Number, default: 0 },
  status: { type: String, default: 'pending' },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

orderSchema.methods.ownBy = function (user) {
  return this.user.equals(user._id);
};

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
