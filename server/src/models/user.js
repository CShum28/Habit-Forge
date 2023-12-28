const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: [5, "Username should be atleast 5 characters long"],
  },
  password: {
    type: String,
    required: true,
    minlength: [5, "Password must be atleast 5 characters long"],
  },
  name: {
    type: String,
    required: true,
    minlength: [1, "Name should be atleast 1 character long"],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
