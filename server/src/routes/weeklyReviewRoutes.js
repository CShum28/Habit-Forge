const express = require("express");
const router = express.Router();

const userAuth = require("../middleware/userAuth");
const toDoItem = require("../models/toDoItem");

router.post("/", userAuth, (req, res) => {
  const { monday, sunday } = req.body;

  let dayOfWeek = new Date(monday);
  //   const start = new Date(monday);
  //   const endDate = new Date(sunday);
  //   const end = endDate.setDate(endDate.getDate() + 1);
  //   let loop = new Date(start);
  //   while (loop <= end) {
  //     console.log(loop);
  //     let newDate = loop.setDate(loop.getDate() + 1);
  //     loop = new Date(newDate);
  //   }

  // The user object here is attached by the userAuth middleware
  // after verifying the JWT token and fetching the user from the database.
  const user = req.user;

  let weeklyData = {
    monday: {
      completed: 0,
      total: 0,
    },
    tuesday: {
      completed: 0,
      total: 0,
    },
    wednesday: {
      completed: 0,
      total: 0,
    },
    thurday: {
      completed: 0,
      total: 0,
    },
    friday: {
      completed: 0,
      total: 0,
    },
    saturday: {
      completed: 0,
      total: 0,
    },
    sunday: {
      completed: 0,
      total: 0,
    },
  };

  toDoItem.find({ user_id: user._id }).then((results) => {
    for (const day in weeklyData) {
      // Grabbing the specific day of the week to check and compare with DB
      let formattedDate = dayOfWeek.toISOString().split("T")[0];
      dayOfWeek.setDate(dayOfWeek.getDate() + 1);
      console.log(weeklyData[day].total);
    }
  });
});

module.exports = router;
