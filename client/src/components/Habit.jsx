import React, { useState, useEffect } from "react";
import axios from "axios";
import EditHabitModal from "./EditHabitModal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import { useSelector } from "react-redux";

function Habit({ habit, categoryId, completedDates, refetchHabits }) {
  //Grab current date
  const dateString = useSelector((state) => state.date.value);
  // convert ISO string into date
  const date = new Date(dateString);

  // Extract the year, month, and day parts to avoid timezone issues
  // Ensure date stays within the correct timezone
  const timeZone = "America/New_York"; // Use your desired time zone
  const compareDate = date
    .toLocaleString("en-US", {
      timeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .split(",")[0]
    .split("/");
  // Reconfigure data to ensure it can match up with the completeDates array to be compared
  const dateYear = compareDate.pop();
  compareDate.unshift(dateYear);
  // create new const and join to compare for isChecked
  const testingDate = compareDate.join("-");

  // console.log(compareDate);

  // State to track if the checkbox is checked
  const [isChecked, setIsChecked] = useState(false);

  // Effect to update isChecked based on completedDates and testingDate
  useEffect(() => {
    setIsChecked(completedDates.includes(testingDate));
  }, [completedDates, testingDate]); // Dependencies that trigger the effect

  // Gives you what day it is (ex. Monday, Tuesday, etc.)
  const dayOfWeek = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
  }).format(date);

  // Checks your habit is on the right day
  const isHabitDueToday = habit.days.includes(dayOfWeek);

  // Handler to update the checkbox state and potentially update the backend
  const handleCheckboxChange = () => {
    const newCheckedStatus = !isChecked;
    setIsChecked(newCheckedStatus);

    // Extract the year, month, and day parts to avoid timezone issues
    // Ensure date stays within the correct timezone
    const timeZone = "America/New_York"; // Use your desired time zone
    const formattedDate = date
      .toLocaleString("en-US", {
        timeZone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .split(",")[0];

    const baseUrl = import.meta.env.VITE_BASE_URL;
    axios
      .put(
        `${baseUrl}/api/habit/${habit._id}/toggleCheck`,
        {
          date: formattedDate,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res);
        setIsChecked(newCheckedStatus);
        // After successfully updating the habit, refetch the habits data
        refetchHabits(); // This triggers the refetch in the Category component
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {isHabitDueToday && (
        <div className="flex flex-row items-center gap-x-2 my-3">
          <input
            type="checkbox"
            onChange={handleCheckboxChange}
            checked={isChecked}
          />
          <label>{habit.name}</label>
          <EditHabitModal habit={habit} categoryId={categoryId} />
          <ConfirmDeleteModal habit={habit} categoryId={categoryId} />
          {/* passed down categoryId to be used for delete habit */}
        </div>
      )}
    </>
  );
}

export default Habit;
