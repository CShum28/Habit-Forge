import React, { useState, useEffect } from "react";
import axios from "axios";

function Habit({ habit }) {
  // State to track if the checkbox is checked
  const [isChecked, setIsChecked] = useState(habit.completed);

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

  useEffect(() => {
    console.log(`${habit.name} is currently ${isChecked ? "true" : "false"}`);
  }, [isChecked]);

  return (
    <div className="flex flex-row items-center gap-x-2">
      <input
        type="checkbox"
        onChange={handleCheckboxChange}
        checked={isChecked}
      />
      <label>{habit.name}</label>
    </div>
  );
}

export default Habit;
