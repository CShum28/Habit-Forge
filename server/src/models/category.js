const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  color: {
    type: String,
  },
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
