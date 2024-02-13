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

  // Gives you what day it is (ex. Monday, Tuesday, etc.)
  const dayOfWeek = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
  }).format(date);

  // REFACTOR THIS AFTER
  // Empty array to calculate the number of ACTUAL completed habits
  let actualCompleted = 0;
  // Map through habits
  habitsData?.map((habit) => {
    // console.log(habit);
    const complete = habit.completionStatus;
    // Map through habits again to count the number of completed for the day
    if (complete) {
      complete.map((completeInfo) => {
        // for some reason when the date gets here the timezone changes
        // NEED TO FIGURE THIS PART OUT LOOK INTO DATE SLICE AND UTC VALUE
        // Compare date and date of completed habit info
        if (completeInfo.date.split("T")[0] === dateString.split("T")[0]) {
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
        className="flex flex-row justify-between border-b-4 mb-2 border-slate-400"
      >
        <p>
          {category.name} - color: {category.color}
        </p>

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
