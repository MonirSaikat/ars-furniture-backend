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
});

userSchema.pre('save', async function(next) {
  const salt = await bcrypt.genSalt(10);
  this.password = bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.validatePassword = async function(password, next){
  const matched = await bcrypt.compare(password, this.password);
  if(matched) next();
  else throw new Error('Password do not match!');
};

const User = mongoose.model("User", userSchema);
module.exports = User;
