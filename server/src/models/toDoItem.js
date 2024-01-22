const mongoose = require("mongoose");

const toDoItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  days: {
    type: [String], // Array of days like ["Monday", "Wednesday", "Friday"]
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const ToDoItem = mongoose.model("ToDoItem", toDoItemSchema);

module.exports = ToDoItem;
