const express = require("express");
const router = express.Router();
const userAuth = require("../middleware/userAuth");
const ToDoItem = require("../models/toDoItem");
const WeeklyResults = require("../models/weeklyResults");

// Get the weekly reviews based on the userId
router.get("/", userAuth, (req, res) => {
  // The user object here is attached by the userAuth middleware
  // after verifying the JWT token and fetching the user from the database.
  const user = req.user;

  WeeklyResults.find({ user_id: user._id })
    .sort({ week_start_date: -1 })
    .then((weeklyReview) => {
      res.status(200).json(weeklyReview);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
});

// POST route to create a new Weekly Review
router.post("/", userAuth, (req, res) => {
  const { monday } = req.body;

  // Using monday as the first day of the week
  let dayOfWeek = new Date(monday);

  // using setDate to get first day of week
  // Need to do -1 because of timezone issue, when date goes from front to back (the date shows up on back as +1)
  dayOfWeek.setDate(dayOfWeek.getDate());
  // dayOfWeek.setDate(dayOfWeek.getDate() - 1);

  // The user object here is attached by the userAuth middleware
  // after verifying the JWT token and fetching the user from the database.
  const user = req.user;

  const weeklyData = {
    Monday: {
      day: undefined,
      completed: 0,
      total: 0,
    },
    Tuesday: {
      day: undefined,
      completed: 0,
      total: 0,
    },
    Wednesday: {
      day: undefined,
      completed: 0,
      total: 0,
    },
    Thurday: {
      day: undefined,
      completed: 0,
      total: 0,
    },
    Friday: {
      day: undefined,
      completed: 0,
      total: 0,
    },
    Saturday: {
      day: undefined,
      completed: 0,
      total: 0,
    },
    Sunday: {
      day: undefined,
      completed: 0,
      total: 0,
    },
  };

  ToDoItem.find({ user_id: user._id })
    .then((results) => {
      for (const day in weeklyData) {
        // Grabbing the specific day of the week to check and compare with DB
        let formattedDate = dayOfWeek.toISOString().split("T")[0];

        const options = {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        };

        // Get the info on date with name of Month
        const nameMonthDate = dayOfWeek.toLocaleString("en-US", options);
        // Update the object day
        weeklyData[day].day = nameMonthDate;
        console.log(nameMonthDate);

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
    })
    .then(() => {
      // Using monday as the first day of the week
      let firstDayOfWeek = new Date(monday);

      // using setDate to get first day of week
      // Need to do -1 because of timezone issue, when date goes from front to back (the date shows up on back as +1)
      firstDayOfWeek.setDate(firstDayOfWeek.getDate() - 1);

      WeeklyResults.create({
        user_id: user._id,
        week_start_date: firstDayOfWeek.toISOString().split("T")[0],
        accomplishments: weeklyData,
      });
    })
    .then(() => {
      res.status(201).json({ message: "Weekly result data created" });
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

module.exports = router;
