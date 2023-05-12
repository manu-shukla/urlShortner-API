const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please Enter an Email"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please Enter a valid Email"],
  },

  password: {
    type: String,
    required: [true, "Please enter a password"],
  },
  token: {
    type: String,
    required: true,
  },
  usage: {
    type: Number,
    required: true,
    default: 0,
  },
  limit:{
    type: Number, 
    requried: true,
    default : 10
  }
});

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model("user", userSchema);

module.exports = User;
