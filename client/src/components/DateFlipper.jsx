import React, { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { useSelector, useDispatch } from "react-redux";
import { increaseDate, decreaseDate, setDate } from "../feature/date/dateSlice";

function DateFlipper() {
  const dateString = useSelector((state) => state.date.value);

  // convert ISO string into date
  const date = new Date(dateString);
  const dispatch = useDispatch();

  const handleDateChange = (newDate) => {
    dispatch(setDate(newDate.toISOString())); // Convert Date object to ISO string before dispatching
  };

  return (
    <div className="flex flex-row justify-center items-center gap-x-2">
      <Button
        onClick={() => dispatch(decreaseDate())}
        className="bg-inherit text-black hover:bg-inherit"
      >
        <ArrowLeft />
      </Button>
      <DatePicker value={date} onChange={handleDateChange} />
      <Button
        onClick={() => dispatch(increaseDate())}
        className="bg-inherit text-black hover:bg-inherit"
      >
        <ArrowRight />
      </Button>
    </div>
  );
}

export default DateFlipper;
