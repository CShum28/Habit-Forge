const express = require("express");
const router = express.Router();

const userAuth = require("../middleware/userAuth");
const toDoItem = require("../models/toDoItem");

router.post("/", userAuth, (req, res) => {
  const { monday, sunday } = req.body;

  // Using monday as the first day of the week
  let dayOfWeek = new Date(monday);

  // The user object here is attached by the userAuth middleware
  // after verifying the JWT token and fetching the user from the database.
  const user = req.user;

  const weeklyData = {
    Monday: {
      completed: 0,
      total: 0,
    },
    Tuesday: {
      completed: 0,
      total: 0,
    },
    Wednesday: {
      completed: 0,
      total: 0,
    },
    Thurday: {
      completed: 0,
      total: 0,
    },
    Friday: {
      completed: 0,
      total: 0,
    },
    Saturday: {
      completed: 0,
      total: 0,
    },
    Sunday: {
      completed: 0,
      total: 0,
    },
  };

  toDoItem.find({ user_id: user._id }).then((results) => {
    for (const day in weeklyData) {
      // Grabbing the specific day of the week to check and compare with DB
      let formattedDate = dayOfWeek.toISOString().split("T")[0];

      results.map((habit) => {
        // Grab array of days from the completionStatus
        const completedDatesArr = habit.completionStatus.map(
          (completedDate) => {
            return completedDate.date.toISOString().split("T")[0];
          }
        );

        // Checks and sums up the total completed
        if (completedDatesArr.includes(formattedDate)) {
          weeklyData[day].completed++;
        }

        // Checks and sums up the total for the day
        if (habit.days.includes(day)) {
          weeklyData[day].total++;
        }
      });
      // Move on to the next day
      dayOfWeek.setDate(dayOfWeek.getDate() + 1);
    }

    console.log(weeklyData);
  });
});

module.exports = router;
