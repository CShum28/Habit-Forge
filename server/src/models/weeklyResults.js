const mongoose = require("mongoose");

const weeklyResultsSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  week_start_date: {
    type: Date,
    required: true,
  },
  accomplishments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ToDoItem",
    },
  ],
});

const WeeklyResults = mongoose.model("WeeklyResults", weeklyResultsSchema);

module.exports = WeeklyResults;
