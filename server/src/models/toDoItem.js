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
  completed: {
    type: Boolean,
    default: false,
  },
});

const ToDoItem = mongoose.model("ToDoItem", toDoItemSchema);

module.exports = ToDoItem;
