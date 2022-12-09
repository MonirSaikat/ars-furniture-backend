const mongoose = require("mongoose");
const { Schema } = mongoose;

const reviewSchema = new Schema({
  text: String,
  rating: Number,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
});

reviewSchema.methods.ownBy = function(user){
  return this.user.equals(user._id);
};

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
