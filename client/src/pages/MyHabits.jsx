import React, { useState } from "react";
import Header from "../components/Header";
import { DatePicker } from "@mui/x-date-pickers";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

function MyHabits() {
  const [date, setDate] = useState(new Date());

  const decreaseDate = () => {
    setDate((prev) => {
      // Create a new Date instance to avoid mutating the original date
      const newDate = new Date(prev);
      // Decrease the date by one day
      newDate.setDate(newDate.getDate() - 1);
      return newDate;
    });
  };

  const increaseDate = () => {
    setDate((prev) => {
      // Create a new Date instance to avoid mutating the original date
      const newDate = new Date(prev);
      // Increase the date by one day
      newDate.setDate(newDate.getDate() + 1);
      return newDate;
    });
  };

  return (
    <div>
      <Header />
      <div className="content-container content-header-margin">
        <div className="flex flex-row justify-center items-center gap-x-2">
          <Button
            onClick={decreaseDate}
            className="bg-inherit text-black hover:bg-inherit"
          >
            <ArrowLeft />
          </Button>
          <DatePicker value={date} onChange={(newDate) => setDate(newDate)} />
          <Button
            onClick={increaseDate}
            className="bg-inherit text-black hover:bg-inherit"
          >
            <ArrowRight />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default MyHabits;
