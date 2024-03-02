import React from "react";

import AddHabitModal from "./AddHabitModal";
import EditCategoryModal from "../components/EditCategoryModal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import Habit from "./Habit";

import { useSelector } from "react-redux";

import { useGetHabitsByIdQuery } from "../app/api/habits/habitsApi";

function Category({ category }) {
  const { data: habitsData, refetch } = useGetHabitsByIdQuery(category._id);

  //Grab current date
  const dateString = useSelector((state) => state.date.value);
  // convert ISO string into date
  const date = new Date(dateString);

  // Rearrange the date to fit and match up with the date we are lookig for inside of weeklyResults database
  const dateParts = dateString.split(",")[0].split("/");

  // Ensure month and day are in two-digit format
  const month = dateParts[0].padStart(2, "0");
  const day = dateParts[1].padStart(2, "0");
  const year = dateParts[2];

  // Format date so its the exact same as the one in the database so we can match it up and pull the right info
  // Use to compare and check if date within the complete section
  const formattedDate = `${year}-${month}-${day}`;

  // Gives you what day it is (ex. Monday, Tuesday, etc.)
  const dayOfWeek = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
  }).format(date);

  // Empty array to calculate the number of ACTUAL completed habits
  let actualCompleted = 0;
  // Map through habits
  habitsData?.map((habit) => {
    // console.log(habit);
    const complete = habit.completionStatus;
    // Map through habits again to count the number of completed for the day
    if (complete) {
      complete.map((completeInfo) => {
        // Compare date and date of completed habit info
        if (completeInfo.date.split("T")[0] === formattedDate) {
          actualCompleted++;
        }
      });
    }
  });

  // Empty array to calculate the number of habits to be done
  const completeTotal = [];
  // Loop over habits to check the number of habits to be done within the day
  habitsData?.map((habit) => {
    if (habit.days.includes(dayOfWeek)) {
      completeTotal.push(habit);
    }
  });

  return (
    <div>
      <div
        key={category._id}
        className={`flex flex-row justify-between border-b-4 mb-2 border-slate-400 px-2 py-1 rounded-t-lg ${
          category.color === "blue"
            ? "bg-blue-200"
            : category.color === "red"
            ? "bg-red-200"
            : category.color === "green"
            ? "bg-green-200"
            : ""
        }`}
      >
        <p>{category.name}</p>

        <div className="flex flex-row gap-x-2">
          <AddHabitModal category={category} />
          <EditCategoryModal category={category} />
          <ConfirmDeleteModal category={category} />
        </div>
      </div>
      <div className="mx-2">
        {habitsData &&
          habitsData.map((habit) => {
            // array of dates where the habit has been completed
            const completedDatesArr = habit.completionStatus.map(
              (completedDate) => {
                return completedDate.date.split("T")[0];
              }
            );
            return (
              // passed down categoryId to be used on delete habit
              <Habit
                key={habit._id}
                habit={habit}
                categoryId={category._id}
                completedDates={completedDatesArr}
                refetchHabits={refetch}
              />
            );
          })}
        {/* Display number of habits to be completed if an habit exists in category */}
        {completeTotal.length > 0 && (
          <p>
            Completed: {actualCompleted}/{completeTotal.length}
          </p>
        )}
      </div>
    </div>
  );
}

export default Category;
