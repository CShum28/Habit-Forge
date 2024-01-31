const express = require("express");
const router = express.Router();
const ToDoItem = require("../models/toDoItem");

const userAuth = require("../middleware/userAuth");

// Create new habit route
router.post("/", userAuth, (req, res) => {
  const { habit, days, category_id } = req.body;
  // The user object here is attached by the userAuth middleware
  // after verifying the JWT token and fetching the user from the database.
  const user = req.user;
  ToDoItem.create({
    name: habit,
    days: days,
    category_id: category_id,
    user_id: user._id,
  })
    .then((habit) => {
      res.status(200).json(habit);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
});

// Update habit route
router.put("/:id", userAuth, (req, res) => {
  const { id } = req.params;

  const { habit, days } = req.body;

  const filter = { _id: id };
  const update = {
    name: habit,
    days,
  };

  console.log(id);

  ToDoItem.findOneAndUpdate(filter, update, { new: true })
    .then(() => {
      res.status(200).json({ message: "Habit updated" });
    })
    .catch((err) => {
      res.status(400).json({ message: "Error updating habit: ", err });
    });
});

router.put("/:id/toggleCheck", userAuth, (req, res) => {
  const habitId = req.params.id;
  const { date } = req.body;

  ToDoItem.findOne({ _id: habitId })
    .then((toDoItem) => {
      // Check to see if the date exists inside of toDoItems.completionStatus array
      const completionExistCheck = toDoItem.completionStatus.filter(
        (completedInfo) => {
          const stringDate = completedInfo.date;

          // Extract the year, month, and day parts to avoid timezone issues
          // Ensure date stays within the correct timezone
          const timeZone = "America/New_York"; // Use your desired time zone
          const formattedDate = stringDate
            .toLocaleString("en-US", {
              timeZone,
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })
            .split(",")[0];

          // Compares the dates inside of formattedDate(toDoItem.completionStatus) to toggleDate(which was passed in)
          return formattedDate === date;
        }
      );

      // If the date exists, it will filter to remove it from toDoItem.completionStatus
      if (completionExistCheck.length === 1) {
        console.log("removing: ", date);
        toDoItem.completionStatus = toDoItem.completionStatus.filter(
          (completedInfo) => {
            const stringDate = completedInfo.date;

            // Extract the year, month, and day parts to avoid timezone issues
            // Ensure date stays within the correct timezone
            const timeZone = "America/New_York"; // Use your desired time zone
            const formattedDate = stringDate
              .toLocaleString("en-US", {
                timeZone,
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })
              .split(",")[0];

            // Compares the dates inside of toDoItem.completionStatus to date(which was passed in)
            return formattedDate !== date;
          }
        );
        // If it does not exist, it will add it to toDoItem.completionStatus
      } else {
        console.log("added: ", date);
        toDoItem.completionStatus.push({ date: date });
      }
      console.log("--");
      toDoItem
        .save()
        .then(() => {
          res.status(200).json({ message: "Habit status updated" });
        })
        .catch((err) => {
          res.status(400).json({ message: err.message });
        });
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
});

// Get habits for category
router.get("/", userAuth, (req, res) => {
  const categoryId = req.query.categoryId;

  ToDoItem.find({ category_id: categoryId })
    .then((habits) => {
      res.status(200).json(habits);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
});

// // Delete habit path
router.delete("/:id", userAuth, (req, res) => {
  const { id } = req.params;

  ToDoItem.deleteOne({ _id: id })
    .then(() => res.status(200).json({ message: "Habit deleted" }))
    .catch((err) =>
      res.status(500).json({ message: "Error deleting habit: ", err })
    );
});

module.exports = router;
