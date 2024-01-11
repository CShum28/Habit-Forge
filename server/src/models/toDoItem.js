const mongoose = require("mongoose");

const toDoItemSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  taskExecutionDates: {
    // Array of dates for when the task should be done
    type: [Date],
    default: [],
  },
  task: {
    type: String,
    required: true,
  },
  category: {
    type: [String], // Array of strings if multiple categories per item
  },
  color: {
    type: String, // Store color as a string (e.g., '#FF5733', 'red', 'rgb(255,0,0)')
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const ToDoItem = mongoose.model("ToDoItem", toDoItemSchema);

module.exports = ToDoItem;
