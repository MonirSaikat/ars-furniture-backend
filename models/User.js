const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  imageUrl: String,
  isAdmin: {
    type: Boolean,
    default: false,
  },
  address: { type: String, default: '' }
});

userSchema.methods.validatePassword = async function(password){
  return await bcrypt.compareSync(password, this.password);
};

userSchema.pre('save', async function(next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
