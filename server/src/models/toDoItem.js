const mongoose = require("mongoose");

// Schema to track completion status for each day
const completionStatusSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  completed: {
    type: Boolean,
    default: true,
  },
});

// ToDoItem scheuma
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
  completionStatus: [completionStatusSchema], //Array of completed status for each day
});

const ToDoItem = mongoose.model("ToDoItem", toDoItemSchema);

module.exports = ToDoItem;
