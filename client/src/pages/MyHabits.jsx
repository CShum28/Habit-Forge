import React, { useState } from "react";
import Header from "../components/Header";
import DateFlipper from "../components/DateFlipper";
import AddHabit from "../components/AddHabit";
import AddCategory from "../components/AddCategory";

function MyHabits() {
  // const [date, setDate] = useState(new Date());

  return (
    <div>
      <Header />
      <div className="content-container content-header-margin">
        <DateFlipper />
        {/* <AddHabit /> */}
        <AddCategory />
      </div>
    </div>
  );
}

export default MyHabits;
