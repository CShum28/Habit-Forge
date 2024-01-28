import React, { useState, useEffect } from "react";
import axios from "axios";

import EditHabitModal from "./EditHabitModal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

import { useSelector } from "react-redux";

function Habit({ habit, categoryId }) {
  // State to track if the checkbox is checked
  const [isChecked, setIsChecked] = useState(habit.completed);

  //Grab current date
  const dateString = useSelector((state) => state.date.value);
  // convert ISO string into date
  const date = new Date(dateString);

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

    const baseUrl = import.meta.env.VITE_BASE_URL;
    axios
      .patch(`${baseUrl}/api/habit/${habit._id}/toggleCheck`, {
        completed: newCheckedStatus,
      })
      .then((res) => {
        console.log(res);
        setIsChecked(newCheckedStatus);
      })
      .catch((err) => console.log(err));
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
